import { experienceOptions } from '@/collections/JobApplications'
import { getPayloadClient } from '@/lib/payload'

/** Vercel rejects request bodies above 4.5 MB, so the CV limit sits safely under it. */
const MAX_CV_BYTES = 4 * 1024 * 1024

const cvTypes: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const fail = (message: string, status = 400) => Response.json({ message }, { status })

const text = (fd: FormData, key: string, max: number) => {
  const v = fd.get(key)
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

/** Receives the application form on a job page and saves it to Careers → Job applications. */
export async function POST(request: Request) {
  let fd: FormData
  try {
    fd = await request.formData()
  } catch {
    return fail('We could not read the form. Please try again.')
  }

  // Bots fill the hidden "website" field; people never see it. Pretend it worked.
  if (text(fd, 'website', 200)) return Response.json({ ok: true })

  const name = text(fd, 'name', 120)
  const phone = text(fd, 'phone', 30)
  const email = text(fd, 'email', 200)
  const city = text(fd, 'city', 120)
  const experience = text(fd, 'experience', 20)
  const message = text(fd, 'message', 3000)
  const jobId = Number(text(fd, 'job', 20))

  if (name.length < 2) return fail('Please enter your full name.')
  if (phone.replace(/\D/g, '').length < 7 || !/^[\d\s()+-]+$/.test(phone)) return fail('Please enter a valid phone number.')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email address.')
  if (experience && !experienceOptions.some((o) => o.value === experience)) return fail('Please choose your experience from the list.')
  if (!Number.isInteger(jobId)) return fail('This role could not be found.')

  const cv = fd.get('resume')
  const file = cv instanceof File && cv.size > 0 ? cv : null
  const ext = file?.name.split('.').pop()?.toLowerCase() || ''
  if (file) {
    if (!cvTypes[ext]) return fail('Please upload your CV as a PDF or Word file.')
    if (file.size > MAX_CV_BYTES) return fail('Your CV is larger than 4 MB. Please upload a smaller file.')
  }

  const payload = await getPayloadClient()
  const job = await payload.findByID({ collection: 'jobs', id: jobId, depth: 0, disableErrors: true })
  if (!job || !job.open) return fail('This role is no longer open.', 410)

  let resumeId: number | undefined
  try {
    if (file) {
      const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'candidate'
      const resume = await payload.create({
        collection: 'resumes',
        data: {},
        file: { data: Buffer.from(await file.arrayBuffer()), mimetype: cvTypes[ext], name: `${safeName}-cv-${Date.now()}.${ext}`, size: file.size },
      })
      resumeId = resume.id
    }
    await payload.create({
      collection: 'job-applications',
      data: {
        name,
        phone,
        email: email || undefined,
        city: city || undefined,
        experience: (experience || undefined) as never,
        message: message || undefined,
        resume: resumeId,
        job: job.id,
        jobTitle: job.title,
        status: 'new',
        pageUrl: text(fd, 'pageUrl', 500) || undefined,
      },
    })
  } catch (err) {
    payload.logger.error({ err }, 'Job application could not be saved')
    if (resumeId) await payload.delete({ collection: 'resumes', id: resumeId }).catch(() => {})
    // Payload inspects the file's contents, so a renamed or damaged file is refused here.
    if (!resumeId && file && (err as Error).name === 'ValidationError') {
      return fail('We could not read your CV. Please upload a valid PDF or Word file.')
    }
    return fail('We could not save your application. Please try again.', 500)
  }

  return Response.json({ ok: true })
}
