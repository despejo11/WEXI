import ScrollTrack from '@/components/ScrollTrack/ScrollTrack'
import Header from '@/ui/Header/Header'
import ContactContent from '@/ui/ContactContent/ContactContent'
import Footer from '@/ui/Footer/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WEXI/Contact',
  description: 'Get in touch with the WEXI team!',
}

export default function Contact() {
  return (
    <>
      <ScrollTrack />
      <Header />
      <ContactContent />
      <Footer />
    </>
  )
}
