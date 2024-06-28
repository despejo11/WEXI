import styles from '@/styles/not-found.module.scss'

import Header from '@/ui/Header/Header'
import LinkButton from '@/components/LinkButton/LinkButton'

import { LuExternalLink } from 'react-icons/lu'

export default function notFound() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <p className={styles.titled}>
          <span>Wrong</span> turn?
        </p>
        <div className={styles.button}>
          <LinkButton label='Go Home' icon={<LuExternalLink />} href='/' />
        </div>

        <p className={styles.title}>404</p>
      </div>
    </>
  )
}
