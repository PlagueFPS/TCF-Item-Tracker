"use client"
import { Rajdhani } from "next/font/google"

interface Props {
  error: Error
  reset: () => void
}

const font = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang='en' className={ `bg-primary-900 ${font.className}` }>
      <body>
        <main>
          <div className='flex flex-col gap-8 justify-center items-center h-[50vh]'>
            <h2 className='text-2xl md:text-4xl text-secondary-400 font-bold mt-20'>Oh no, Something went wrong!</h2>
            <p className='text-xl md:text-2xl text-center px-2 text-secondary-500 '>{ error.message }</p>
            <button 
              className='bg-secondary-500 py-2 px-3 rounded w-fit text-primary-900 font-bold text-xl mb-20 hover:bg-secondary-700' 
              onClick={ reset }
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
