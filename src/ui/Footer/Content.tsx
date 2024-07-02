'use client'

import styles from './style.module.scss'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import { FaArrowUp } from 'react-icons/fa6'

import { usePathname, useRouter } from 'next/navigation'
import { animatePageOut } from '@/utils/transition'

export default function Content() {
  return (
    <div className={styles.content}>
      <Nav />
      <Privacy />
    </div>
  )
}

function Nav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (href: string) => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

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

        <a onClick={() => handleClick('/')} className={styles.link}>
          Home
        </a>
        <a onClick={() => handleClick('/dashboard')} className={styles.link}>
          Dashboard
        </a>
        <a onClick={() => handleClick('/contact')} className={styles.link}>
          Contact
        </a>
      </div>
    </>
  )
}

function Privacy() {
  return (
    <div className={styles.privacy}>
      <motion.p
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        className={styles.heading}
      >
        WEXI
      </motion.p>
      <p className={styles.rules}>
        © {new Date().getFullYear()} WEXI, all <span>rights</span> reserved.
      </p>
    </div>
  )
}
