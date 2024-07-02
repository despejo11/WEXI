'use client'

import styles from './style.module.scss'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { animatePageOut } from '@/utils/transition'
import SliderButton from './SliderButton/SliderButton'
import Nav from './Nav/Nav'

const menu = {
  open: {
    width: 'clamp(15rem, 9.545rem + 27.27vw, 30rem)',
    height: 'clamp(26.875rem, 24.148rem + 13.64vw, 34.375rem)',
    top: '-25px',
    right: '-25px',
    transition: { duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1] },
  },

  closed: {
    width: '100px',
    height: '40px',
    top: '0px',
    right: '0px',
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: 'tween',
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

export default function Header() {
  const [isActive, setIsActive] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = () => {
    if (pathname !== '/') {
      animatePageOut('/', router)
    }
  }

  return (
    <header>
      <motion.a
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 1 }}
        onClick={handleLogoClick}
        className={styles.logo}
      >
        <img src='/images/other/logo.png' alt='Logo' />
        <p>WEXI</p>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 1 }}
        className={styles.menu}
      >
        <motion.div
          className={styles.content}
          variants={menu}
          animate={isActive ? 'open' : 'closed'}
          initial='closed'
        >
          <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
        </motion.div>

        <SliderButton
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive)
          }}
        />
      </motion.div>
    </header>
  )
}
