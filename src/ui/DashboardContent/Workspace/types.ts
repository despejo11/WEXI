import { TWorkspace, TNote } from '../types'

export type TWorkspaceProps = {
  workspace: TWorkspace
  addNote: (workspaceId: number, note: TNote) => void
  updateNoteProgress: (
    workspaceId: number,
    noteId: number,
    progress: string
  ) => void
  deleteNote: (workspaceId: number, noteId: number) => void
  updateNoteText: (workspaceId: number, noteId: number, newText: string) => void
  workspaceName: string
  notesCount: number
}
