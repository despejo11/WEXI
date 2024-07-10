import ScrollTrack from '@/components/ScrollTrack/ScrollTrack'
import Header from '@/ui/Header/Header'
import Title from '@/components/Title/Title'
import Footer from '@/ui/Footer/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WEXI/404',
  description: 'Page not found - WEXI',
}

export default function Page() {
  return (
    <>
      <ScrollTrack />
      <Header />
      <Title title='404' span='Wrong' titled='turn?' showButton={true} />
      <Footer />
    </>
  )
}
