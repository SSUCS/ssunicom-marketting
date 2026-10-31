import { LOGO_FILES, logoSvg, type LogoFile } from '@/brand/logoSvg'

// Logo downloads for the brand guide. Logos are public artwork, so these files need no sign-in.
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!(file in LOGO_FILES)) return new Response('Not found', { status: 404 })
  return new Response(logoSvg(file as LogoFile), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Content-Disposition': `attachment; filename="${file}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
