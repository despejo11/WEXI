import Title from '@/components/Title/Title'
import ParallaxText from './ParallaxText/ParallaxText'
import About from './About/About'

export default function HomeContent() {
  return (
    <>
      <div className='container'>
        <Title title='HOME' span='Correct' titled='turn' showButton={false} />
      </div>
      <ParallaxText />
      <div className='container'>
        <About />
      </div>
    </>
  )
}
