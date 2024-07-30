import Link from 'next/link';
import { Fragment } from 'react';


export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

const website_url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}`
const dev_url = 'http://localhost:3000'

function generateTextAlign(node) {
  if (node.format === 'right') return 'text-right'
  if (node.format === 'center') return 'text-center'
  else return ''
}

export default function serializeLexicalRichText({ children, parentNode = {} }) {
  return (children?.map((node, i) => {
    const classNames = {
      h1: 'mt-6 text-5xl font-bold',
      h2: 'mt-5 text-4xl font-bold',
      h3: 'mt-4 text-3xl font-bold',
      h4: 'mt-3 text-2xl font-bold',
      h5: 'mt-2 text-xl font-bold',
      h6: 'mt-1 text-lg font-bold',
      p: 'text-base',
      ul: 'list-disc',
      ol: 'list-decimal',
      li: 'list-item',
      blockquote: 'font-bold text-lg text-gray-600',
      a: 'text-blue-500 underline',
    }




    if (node.type === 'text') {
      let text = node.text ? <span className=''>{node.text}</span> : <span className='opacity-0'>&nbsp;</span>;

      if (node.format & IS_BOLD) {
        text = (
          <strong key={i}>
            {text}
          </strong>
        );
      }

      if (node.format & IS_CODE) {
        text = (
          <code key={i}>
            {text}
          </code>
        );
      }

      if (node.format & IS_ITALIC) {
        text = (
          <em key={i}>
            {text}
          </em>
        );
      }

      if (node.format & IS_UNDERLINE) {
        text = (
          <span
            className='underline'
            key={i}
          >
            {text}
          </span>
        );
      }

      if (node.format & IS_STRIKETHROUGH) {
        text = (
          <span
            className='line-through'
            key={i}
          >
            {text}
          </span>
        );
      }

      return (
        <Fragment key={i}>
          {text}
        </Fragment>
      );
    }

    if (!node) {
      return null;
    }

    if (node.type === 'heading') {
        return (
          <node.tag key={ i }>
            { serializeLexicalRichText({ children: node.children })}
          </node.tag>
        )
      
    }

    // if (node.type === 'upload') {
    //   return (
    //     <RichImage key={ i } src={ node.value.url } description={ node.value.description } />
    //   )
    // }

    if (node.type === 'list') {
      if (node.listType === 'bullet') {
        return (
          <ul className={`${classNames.ul}`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ul>
        );
      } else if (node.listType === 'check') {
        return (
          <ul className={`${classNames.ul} list-none`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ul>
        );
      } else if (node.listType === 'number') {
        return (
          <ol className={`${classNames.ol}`} key={i}>
            {serializeLexicalRichText({ children: node.children, parentNode: node })}
          </ol>
        )
      }
    }

    if (node.type === 'listitem' && node.checked) {
      return (
        <li className={`${classNames.li} flex gap-1`} key={i}>
          <div className='line-through'>
            {serializeLexicalRichText({ children: node.children })}
          </div>
        </li>
      );
    } else if (node.type === 'listitem' && parentNode.listType === 'check') {
      return (
        <li className={`${classNames.li} flex gap-1`} key={i}>
          <div className=''>
            {serializeLexicalRichText({ children: node.children })}
          </div>
        </li>
      );
    } else if (node.type === 'listitem') {
      return (
        <li className={`${classNames.li}`} key={i}>
          {serializeLexicalRichText({ children: node.children })}
        </li>
      );
    }

    switch (node.type) {

      case 'quote':
        return (
          <blockquote className={`${classNames.blockquote}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </blockquote>
        );

      case 'link':
        if (node.fields.url.startsWith(website_url)) {
          return (
            <Link href={ node.fields.url } key={ i }>
              { serializeLexicalRichText({ children: node.children }) }
            </Link>
          )
        }
        else if (node.fields.url.startsWith(dev_url)) {
          return (
            <Link href={ node.fields.url.replace(dev_url, website_url) } key={ i }>
              { serializeLexicalRichText({ children: node.children }) }
            </Link>
          )
        }
        else {
          return (
            <a href={ node.fields.url } target='_blank' rel='noopener noreferrer' key={ i }>
              {serializeLexicalRichText({ children: node.children })}
            </a>
          );
        }


      default:
        return (
          <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
            {serializeLexicalRichText({ children: node.children })}
          </p>
        );
    }
  }).filter((node) => node !== null)
  );
}