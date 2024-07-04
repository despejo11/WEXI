import styles from './style.module.scss'

import { HiOutlineViewGridAdd } from 'react-icons/hi'

export default function WorkspacePanel() {
  return (
    <div className={styles.content}>
      <p className={styles.title}>WORKSPACES</p>

      <button className={styles.addWorkspace}>
        <span className={styles.icon}>
          <HiOutlineViewGridAdd />
        </span>
        Add Workspace
      </button>
    </div>
  )
}
3
