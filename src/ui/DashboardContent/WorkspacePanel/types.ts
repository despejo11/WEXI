import { TWorkspace } from '../types'

export type TWorkspacePanelProps = {
  workspaces: TWorkspace[]
  addWorkspace: () => void
  switchWorkspace: (id: number) => void
  deleteWorkspace: (id: number) => void
  renameWorkspace: (id: number, newName: string) => void
  activeWorkspaceId: number
}
