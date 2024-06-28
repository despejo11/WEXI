import styles from './style.module.scss'

import Link from 'next/link'

import { TLinkButtonProps } from './types'

export default function LinkButton({ label, icon, href }: TLinkButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      <span className={styles.icon}>{icon}</span>
      {label}
    </Link>
  )
}
