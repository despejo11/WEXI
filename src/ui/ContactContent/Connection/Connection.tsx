import styles from './style.module.scss'

export default function Connection() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <p className={styles.title}>CONNECTION</p>
        <p className={styles.description}>
          If you have <span>any</span> ideas, questions, or feedback, please get
          in touch with us.
        </p>
      </div>

      <div className={styles.connections}>
        <a className={styles.email} href='mailto: wexi@gmail.com'>
          wexi@gmail.com
        </a>
        <a className={styles.tel} href='tel: (555) 123-4567'>
          (555) 123-4567
        </a>
      </div>

      <div className={styles.socials}>
        <a href=''>Facebook</a>
        <a href=''>Instagram</a>
      </div>
    </div>
  )
}
