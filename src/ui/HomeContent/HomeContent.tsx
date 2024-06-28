import Title from '@/components/Title/Title'
import ParallaxText from './ParallaxText/ParallaxText'

export default function HomeContent() {
  return (
    <>
      <div className='container'>
        <Title title='HOME' span='Correct' titled='turn' showButton={false} />
      </div>
      <ParallaxText />
    </>
  )
}
