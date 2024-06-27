import styles from './style.module.scss'

import { motion } from 'framer-motion'

import { links, footerLinks } from './data'
import { perspective, slideIn } from './animations'

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <a href={href}>
                <motion.div
                  custom={i}
                  variants={perspective}
                  initial='initial'
                  animate='enter'
                  exit='exit'
                >
                  {title}
                </motion.div>
              </a>
            </div>
          )
        })}
      </div>

      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href } = link
          return (
            <motion.a
              href={href}
              variants={slideIn}
              custom={i}
              initial='initial'
              animate='enter'
              exit='exit'
              key={`f_${i}`}
            >
              {title}
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}
