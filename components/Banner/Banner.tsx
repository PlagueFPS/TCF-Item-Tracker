import styles from './Banner.module.css'
import Image from 'next/image'

interface Props {
  bannerImage: string
  width: number
  height: number
  opacity?: number
  position?: "top" | "bottom" | "center" | "left" | "right"
}

export default function Banner({ bannerImage, width, height, opacity, position }: Props) {
  return (
    <figure className={ styles.container } style={{ opacity: opacity ?? 1 }}>
      <Image
        src={ bannerImage }
        alt=""
        width={ width }
        height={ height }
        sizes='100vw'
        style={{ objectPosition: position ?? 'top' }}
        priority
        />
    </figure>
  )
}
