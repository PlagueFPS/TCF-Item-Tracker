import styles from './Updates.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton, TypeUpdateSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import Header from '@/components/Header/Header'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { renderOptions } from '@/contentful/renderOptions'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '71zMJAauipEB6tKGrTQCJT' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/updates`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function Updates() {
  const posts = await getPosts<TypeUpdateSkeleton>({ content_type: 'update', order: ['-fields.date'] })
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

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
        { posts.items.map(update => (
          <div key={ update.sys.id } className={ styles.updateContainer }>
            <h2 className={ styles.title }>
              { `${update.fields.title} | ${new Date(update.fields.date).toLocaleDateString(undefined, options)}` }
            </h2>
            { documentToReactComponents(update.fields.body, renderOptions) }
          </div>
        ))}
      </div>
    </>
  )
}
