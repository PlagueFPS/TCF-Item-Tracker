import styles from './Banner.module.css'

interface Props {
  bannerImage: string
  width: number
  height: number
  opacity?: number
  position?: "top" | "bottom" | "center" | "left" | "right"
}

export default function Banner({ bannerImage, width, height, opacity, position }: Props) {
  const backgroundAVIF = `/images/${bannerImage}.avif`
  const backgroundWEBP = `/images/${bannerImage}.webp`
  const backgroundPNG = `/images/${bannerImage}.png`

  return (
    <figure className={ styles.container } style={{ opacity: opacity ?? 1 }}>
      <picture>
        <source srcSet={ backgroundAVIF } type='image/avif' />
        <source srcSet={ backgroundWEBP } type='image/webp' />
        <source srcSet={ backgroundPNG } type='image/png' />
        <img
          src={ backgroundPNG }
          alt=""
          width={ width }
          height={ height }
          style={{ objectPosition: position ?? 'top' }}
          />
      </picture>
    </figure>
  )
}
