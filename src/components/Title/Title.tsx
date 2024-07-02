'use client'

import styles from './style.module.scss'
import LinkButton from '@/components/LinkButton/LinkButton'

import { motion } from 'framer-motion'

import { LuExternalLink } from 'react-icons/lu'

import { TPropsTitle } from './types'

export default function Title({
  title,
  span,
  titled,
  showButton,
}: TPropsTitle) {
  let titleClass = styles.title

  if (title === 'HOME') {
    titleClass = `${styles.title} ${styles.home}`
  } else if (title === 'CONTACT') {
    titleClass = `${styles.title} ${styles.contact}`
  } else if (title === '404') {
    titleClass = `${styles.title} ${styles.errorPage}`
  }

  return (
    <div className={styles.content}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className={titleClass}
      >
        {title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 1.4 }}
        className={styles.titled}
      >
        <span>{span}</span> {titled}
      </motion.p>

      {showButton && (
        <div className={styles.button}>
          <LinkButton label='Go Home' icon={<LuExternalLink />} href='/' />
        </div>
      )}
    </div>
  )
}
