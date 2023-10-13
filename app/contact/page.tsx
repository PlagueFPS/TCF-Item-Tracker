import styles from './Contact.module.css'
import { TypeContactSkeleton, TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { getPosts } from "@/utils/contentful-utils"
import { Metadata } from "next"
import Header from "@/components/Header/Header"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { renderOptions } from '@/contentful/renderOptions'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', "sys.id": '4syRNy0EaXRXD1erf5X35v' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/contact`
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function Contact() {
  const posts = await getPosts<TypeContactSkeleton>({ content_type: 'contact', order: ['-sys.createdAt'] })

  return (
    <>
      <Header 
        bannerImage="S3_Background"
        width={ 3840 }
        height={ 2160 }
        opacity={ 0.65 }
        position="bottom"
        title='Contact Us'
      />
      <div className={ styles.container }>
        { posts.items.map(contact => (
          <div key={ contact.sys.id } className={ styles.contactContainer }>
            <h2 className={ styles.title }>{ contact.fields.title }</h2>
            { documentToReactComponents(contact.fields.body, renderOptions) }
          </div>
        ))}
      </div>
    </>
  )
}
