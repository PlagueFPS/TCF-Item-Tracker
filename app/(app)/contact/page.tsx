import styles from './Contact.module.css'
import { getPage, getPageContent } from '@/data/pages'
import { Metadata } from "next"
import Header from "@/components/Header/Header"
import serializeLexicalRichText from "@/utils/serializeLexicalRichText"

export const generateMetadata = async () => {
  const page = await getPage('contact')
  const { title, description } = page
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
  const pagePromise = getPage('contact')
  const contentPromise = getPageContent('contact')
  const [{ image }, content] = await Promise.all([pagePromise, contentPromise])

  return (
    <>
      <Header 
        bannerImage={ image.url }
        width={ 3840 }
        height={ 2160 }
        opacity={ 0.65 }
        position="bottom"
        title='Contact Us'
      />
      <div className={ styles.container }>
        <div className={ styles.contactContainer }>
          { serializeLexicalRichText({ children: content?.root?.children }) }
        </div>
      </div>
    </>
  )
}
