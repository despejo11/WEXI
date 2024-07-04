import styles from './style.module.scss'

import WorkspacePanel from './WorkspacePanel/WorkspacePanel'
import Workspace from './Workspace/Workspace'

export default function DashboardContent() {
  return (
    <div className='container'>
      <div className={styles.content}>
        <WorkspacePanel />
        <Workspace />
      </div>
    </div>
  )
}
