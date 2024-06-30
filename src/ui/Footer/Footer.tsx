import styles from './style.module.scss'

import Content from './Content'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.relative}>
        <div className={styles.sticky}>
          <Content />
        </div>
      </div>
    </footer>
  )
}
