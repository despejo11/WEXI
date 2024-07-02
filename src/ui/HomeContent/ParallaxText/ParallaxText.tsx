'use client'

import styles from './style.module.scss'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

import { TSlideProps, TPhraseProps } from './types'

function Slide(props: TSlideProps) {
  const direction = props.direction === 'left' ? -1 : 1
  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction]
  )

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className={styles.slide}
    >
      <Phrase text={props.text} />
      <Phrase text={props.text} />
      <Phrase text={props.text} />
    </motion.div>
  )
}

function Phrase({ text }: TPhraseProps) {
  return (
    <div className={styles.phrase}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        WEXI <span className={styles.task}>TASK</span> MANAGER
      </motion.p>

      <motion.span
        className={styles.spanText}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 2 }}
      >
        {text}
      </motion.span>
    </div>
  )
}

export default function ParallaxText() {
  const slides = useRef(null)

  const { scrollYProgress } = useScroll({
    target: slides,
    offset: ['start end', 'end start'],
  })

  return (
    <div className={styles.content}>
      <div ref={slides}>
        <Slide
          text='WEXI'
          direction={'left'}
          left={'-55%'}
          progress={scrollYProgress}
        />

        <Slide
          text='TASK'
          direction={'right'}
          left={'-43%'}
          progress={scrollYProgress}
        />

        <Slide
          text='MANAGER'
          direction={'left'}
          left={'-78%'}
          progress={scrollYProgress}
        />
      </div>
    </div>
  )
}
