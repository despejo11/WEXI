'use client'

import styles from './style.module.scss'

import Link from 'next/link'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import { FaArrowUp } from 'react-icons/fa6'

export default function Content() {
  return (
    <div className={styles.content}>
      <Nav />
      <Privacy />
    </div>
  )
}

function Nav() {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1.7, scrollTo: { y: 0 }, ease: 'expo.inOut' })
  }

  return (
    <>
      <button onClick={scrollToTop} className={styles.button}>
        <FaArrowUp />
      </button>

      <div className={styles.nav}>
        <p className={styles.title}>NAVIGATION</p>
        <Link href='/'>Home</Link>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/contact'>Contact</Link>
      </div>
    </>
  )
}

function Privacy() {
  return (
    <div className={styles.privacy}>
      <p className={styles.heading}>WEXI</p>
      <p className={styles.rules}>
        © {new Date().getFullYear()} WEXI, all <span>rights</span> reserved.
      </p>
    </div>
  )
}
