import { INLINES } from '@contentful/rich-text-types'

const website_url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}`

export const renderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return (
        <a href={node.data.uri} target={`${node.data.uri.startsWith(website_url) ? '_self' : '_blank'}`} rel={`${node.data.uri.startsWith(website_url) ? '' : 'noopener noreferrer'}`}>
          { node.content[0].value }
        </a>
      )
    },
  }
}