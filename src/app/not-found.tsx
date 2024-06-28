import Header from '@/ui/Header/Header'
import Title from '@/components/Title/Title'

export default function page() {
  return (
    <div className='container'>
      <Header />
      <Title title='404' span='Wrong' titled='turn?' showButton={true} />
    </div>
  )
}
