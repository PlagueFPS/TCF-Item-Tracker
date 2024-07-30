import styles from './Contact.module.css'
import { getPage } from '@/data/data'
import { Metadata } from "next"
import Header from "@/components/Header/Header"
import serializeLexicalRichText from "@/utils/serializeLexicalRichText"

export const generateMetadata = async () => {
  const page = await getPage('contact')
  const { title, description } = page.docs[0]
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/contact`,
      siteName: 'The Cycle: Frontier Items Tracker',
      type: 'website',
      title: title,
      description: description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/favicon.png`,
      }]
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function Contact() {
  const page = await getPage('contact')
  const { body } = page.docs[0]

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
        <div className={ styles.contactContainer }>
          { serializeLexicalRichText({ children: body?.root?.children }) }
        </div>
      </div>
    </>
  )
}
