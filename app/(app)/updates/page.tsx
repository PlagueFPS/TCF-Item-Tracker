import styles from './Updates.module.css'
import { getPage } from '@/data/pages'
import { Metadata } from 'next'
import Header from '@/components/Header/Header'
import serializeLexicalRichText from '@/utils/serializeLexicalRichText'

export const generateMetadata = async () => {
  const page = await getPage('updates')
  const { title, description } = page
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/updates`,
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

export default async function Updates() {
  const updates = await getUpdates()
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', day: 'numeric', month: 'long' }

  return (
    <>
      <Header 
        bannerImage='S3_Background'
        width={ 3840 }
        height={ 2160 }
        opacity={ 0.65 }
        title='Update Log'
        position='bottom'
      />
      <div className={ styles.container }>
        { updates.docs.map(update => (
          <div key={ update.id } className={ styles.updateContainer }>
            <h2 className={ styles.title }>
              { `${update.title} | ${new Date(update.date).toLocaleDateString(undefined, options)}` }
            </h2>
            { serializeLexicalRichText({ children: update.body.root.children }) }
          </div>
        ))}
      </div>
    </>
  )
}
