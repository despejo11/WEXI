'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

import { animatePageIn } from '@/utils/transition'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn()

    const lenis = new Lenis({
      duration: 1.9,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div>
      <div id='bannerOne' className='banner' />
      <div id='bannerTwo' className='banner' />
      <div id='bannerThree' className='banner' />
      <div id='bannerFour' className='banner' />
      {children}
    </div>
  )
}
