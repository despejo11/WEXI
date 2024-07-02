'use client'

import styles from './style.module.scss'

import { motion } from 'framer-motion'

export default function Connection() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className={styles.title}
        >
          CONNECTION
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className={styles.description}
        >
          If you have <span>any</span> ideas, questions, or feedback, please get
          in touch with us.
        </motion.p>
      </div>

      <div className={styles.connections}>
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 8,
            delay: 1.8,
          }}
          className={styles.email}
          href='mailto: wexi@gmail.com'
        >
          wexi@gmail.com
        </motion.a>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className={styles.tel}
          href='tel: (555) 123-4567'
        >
          (555) 123-4567
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className={styles.socials}
      >
        <a href=''>Facebook</a>
        <a href=''>Instagram</a>
      </motion.div>
    </div>
  )
}
