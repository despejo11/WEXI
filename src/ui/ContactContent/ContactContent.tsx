import Title from '@/components/Title/Title'
import Connection from './Connection/Connection'

export default function ContactContent() {
  return (
    <>
      <Title title='CONTACT' span='Valid' titled='turn' showButton={false} />
      <div className='container'>
        <Connection />
      </div>
    </>
  )
}
