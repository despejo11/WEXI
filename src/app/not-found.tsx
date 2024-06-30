import Header from '@/ui/Header/Header'
import Title from '@/components/Title/Title'
import Footer from '@/ui/Footer/Footer'

export default function page() {
  return (
    <>
      <Header />
      <Title title='404' span='Wrong' titled='turn?' showButton={true} />
      <Footer />
    </>
  )
}
