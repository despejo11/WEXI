import './global.scss'
import '@/../index.scss'

import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

const font = Montserrat({ weight: '600', subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'WEXI',
  description: 'A simple and efficient task manager.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='google' content='notranslate' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicons/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicons/safari-pinned-tab.svg'
          color='#c9fd74'
        />
        <meta name='msapplication-TileColor' content='#111110' />
        <meta name='theme-color' content='#111110' />
      </head>
      <body className={font.className}>
        <div className='screenWidthWarning'>
          <p>
            <span>Only</span> for devices wider than 320px!
          </p>
        </div>

        <div className='screenContent'>{children}</div>
      </body>
    </html>
  )
}
