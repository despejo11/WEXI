'use client'

import styles from './style.module.scss'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

import Button from './Button/Button'
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

  return (
    <header>
      <Link href='/' className={styles.logo}>
        <img src='/images/other/logo.png' alt='Logo' />
        <p>WEXI</p>
      </Link>

      <div className={styles.menu}>
        <motion.div
          className={styles.content}
          variants={menu}
          animate={isActive ? 'open' : 'closed'}
          initial='closed'
        >
          <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
        </motion.div>

        <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive)
          }}
        />
      </div>
    </header>
  )
}
