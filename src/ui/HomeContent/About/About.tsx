'use client'

import styles from './style.module.scss'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import { animatePageOut } from '@/utils/transition'

import { LuExternalLink } from 'react-icons/lu'

export default function About() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (href: string) => {
    if (pathname !== href) {
      animatePageOut(href, router)
      window.scrollTo(0, 0)
    }
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.5 },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, delay: 1 },
    },
  }

  return (
    <div className={styles.content}>
      <motion.button
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 0.5 }}
        onClick={() => handleClick('/dashboard')}
      >
        <span className={styles.icon}>
          <LuExternalLink />
        </span>
        Get Started
      </motion.button>

      <div className={styles.cards}>
        <div className={styles.card}>
          <motion.p
            viewport={{ once: true }}
            variants={titleVariants}
            initial='hidden'
            whileInView='show'
            className={styles.title}
          >
            WHO WE ARE?
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            variants={descriptionVariants}
            initial='hidden'
            whileInView='show'
            className={styles.description}
          >
            <span>We</span> are a dedicated team of productivity enthusiasts
            passionate about helping individuals and organizations manage their
            time efficiently. Our mission is to provide innovative and
            user-friendly tools that simplify time management and enhance
            productivity. With a diverse background in technology, psychology,
            and project management, our team combines expertise and experience
            to create solutions that truly make a difference.
          </motion.p>
        </div>

        <div className={styles.card}>
          <motion.p
            viewport={{ once: true }}
            variants={titleVariants}
            initial='hidden'
            whileInView='show'
            className={styles.title}
          >
            OUR PURPOSE
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            variants={descriptionVariants}
            initial='hidden'
            whileInView='show'
            className={styles.description}
          >
            <span>Our</span> purpose is to empower people to manage their time
            and achieve their ambitions. We believe that effective time
            management is the key to a balanced and fulfilling life. By offering
            intuitive tools, we aim to help our users effectively plan,
            prioritize, and accomplish their tasks. Our goal is to help you work
            smarter, not harder, and make the most of every moment. Join us on
            this journey to unlock your full potential and embrace a more
            organized and productive lifestyle.
          </motion.p>
        </div>

        <div className={styles.card}>
          <motion.p
            viewport={{ once: true }}
            variants={titleVariants}
            initial='hidden'
            whileInView='show'
            className={styles.title}
          >
            WHY CHOOSE US?
          </motion.p>
          <motion.p
            viewport={{ once: true }}
            variants={descriptionVariants}
            initial='hidden'
            whileInView='show'
            className={styles.description}
          >
            <span>We</span> are considered the best in the industry because of
            our commitment to excellence and continuous improvement. Our
            platform is designed with the user in mind, providing a seamless and
            enjoyable experience. Our advanced technology combined with our
            commitment to customer satisfaction makes us the leading choice for
            time management solutions. Trust us to help you unlock your
            productivity potential and realize your aspirations.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
