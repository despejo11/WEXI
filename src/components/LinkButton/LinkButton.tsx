'use client'

import styles from './style.module.scss'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { animatePageOut } from '@/utils/transition'
import { TLinkButtonProps } from './types'

export default function LinkButton({ label, icon, href }: TLinkButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 1.4 }}
      onClick={handleClick}
      className={styles.button}
    >
      <span className={styles.icon}>{icon}</span>
      {label}
    </motion.button>
  )
}
