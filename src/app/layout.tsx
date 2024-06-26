import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import '@/../index.scss'
import './global.scss'

const font = Montserrat({ weight: '700', subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Wexi',
  description: 'A simple and efficient task manager.',
  icons: {
    icon: ['/favicons/favicon.ico?v=4'],
    apple: ['/favicons/apple-touch-icon.png?v=4'],
    shortcut: ['/favicons/apple-touch-icon.png'],
  },
  manifest: '/favicons/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <div className='screenWidthWarning'>
          <p>Only for devices wider than 320px!</p>
        </div>

        <div className='screenContent'>{children}</div>
      </body>
    </html>
  )
}
