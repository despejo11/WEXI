'use client'

import styles from './style.module.scss'

import { motion, useScroll } from 'framer-motion'

export default function ScrollTrack() {
  const { scrollYProgress: completionProgress } = useScroll()

  return (
    <motion.div className={styles.track}>
      <motion.div
        className={styles.thumb}
        style={{ scaleX: completionProgress }}
      />
    </motion.div>
  )
}
