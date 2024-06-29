import styles from './style.module.scss'

export default function About() {
  return (
    <div className={styles.content}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.title}>WHO WE ARE?</p>
          <p className={styles.description}>
            <span>We</span> are a dedicated team of productivity enthusiasts
            passionate about helping individuals and organizations manage their
            time efficiently. Our mission is to provide innovative and
            user-friendly tools that simplify time management and enhance
            productivity. With a diverse background in technology, psychology,
            and project management, our team combines expertise and experience
            to create solutions that truly make a difference.
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.title}>OUR PURPOSE</p>
          <p className={styles.description}>
            <span>Our</span> purpose is to empower people to manage their time
            and achieve their ambitions. We believe that effective time
            management is the key to a balanced and fulfilling life. By offering
            intuitive tools, we aim to help our users effectively plan,
            prioritize, and accomplish their tasks. Our goal is to help you work
            smarter, not harder, and make the most of every moment. Join us on
            this journey to unlock your full potential and embrace a more
            organized and productive lifestyle.
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.title}>WHY CHOOSE US?</p>
          <p className={styles.description}>
            <span>We</span> are considered the best in the industry because of
            our commitment to excellence and continuous improvement. Our
            platform is designed with the user in mind, providing a seamless and
            enjoyable experience. Our advanced technology combined with our
            commitment to customer satisfaction makes us the leading choice for
            time management solutions. Trust us to help you unlock your
            productivity potential and realize your aspirations.
          </p>
        </div>
      </div>
    </div>
  )
}
