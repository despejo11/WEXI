import styles from './style.module.scss'

import { motion } from 'framer-motion'

import { TSliderButtonProps, TPerspectiveTextProps } from './types'

export default function SliderButton({
  isActive,
  toggleMenu,
}: TSliderButtonProps) {
  return (
    <div className={styles.button}>
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <div className={styles.el} onClick={toggleMenu}>
          <PerspectiveText label='Menu' />
        </div>

        <div className={styles.el} onClick={toggleMenu}>
          <PerspectiveText label='Close' />
        </div>
      </motion.div>
    </div>
  )
}

function PerspectiveText({ label }: TPerspectiveTextProps) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  )
}
