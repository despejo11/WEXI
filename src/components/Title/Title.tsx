import styles from './style.module.scss'
import LinkButton from '@/components/LinkButton/LinkButton'

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
      <p className={titleClass}>{title}</p>
      <p className={styles.titled}>
        <span>{span}</span> {titled}
      </p>

      {showButton && (
        <div className={styles.button}>
          <LinkButton label='Go Home' icon={<LuExternalLink />} href='/' />
        </div>
      )}
    </div>
  )
}
