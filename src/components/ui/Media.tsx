import Image from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'

type Props = {
  resource?: number | MediaDoc | null
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  alt?: string
}

/** Renders a CMS upload (image or looping video) with next/image. */
export function Media({ resource, className, imgClassName, sizes = '100vw', priority, fill, alt }: Props) {
  if (!resource || typeof resource !== 'object' || !resource.url) return null
  const isVideo = resource.mimeType?.startsWith('video/')
  if (isVideo) {
    return (
      <video className={imgClassName} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={resource.url} type={resource.mimeType || 'video/mp4'} />
      </video>
    )
  }
  const focal = resource.focalX != null && resource.focalY != null ? `${resource.focalX}% ${resource.focalY}%` : undefined
  if (fill) {
    return (
      <Image
        src={resource.url}
        alt={alt ?? resource.alt ?? ''}
        fill
        sizes={sizes}
        priority={priority}
        className={imgClassName}
        style={focal ? { objectPosition: focal } : undefined}
      />
    )
  }
  return (
    <span className={className}>
      <Image
        src={resource.url}
        alt={alt ?? resource.alt ?? ''}
        width={resource.width || 1200}
        height={resource.height || 800}
        sizes={sizes}
        priority={priority}
        className={imgClassName}
      />
    </span>
  )
}
