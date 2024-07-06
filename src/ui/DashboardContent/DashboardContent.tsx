'use client'

import styles from './style.module.scss'

import { useState, useEffect } from 'react'

import WorkspacePanel from './WorkspacePanel/WorkspacePanel'
import Workspace from './Workspace/Workspace'

import { TWorkspace, TNote } from './types'

export default function DashboardContent() {
  const [workspaces, setWorkspaces] = useState<TWorkspace[]>([])
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<number>(1)

  const localStorageKey = 'Workspaces'

  useEffect(() => {
    const savedWorkspaces = localStorage.getItem(localStorageKey)

    if (savedWorkspaces) {
      const parsedWorkspaces: TWorkspace[] = JSON.parse(savedWorkspaces)
      setWorkspaces(parsedWorkspaces)
      setActiveWorkspaceId(parsedWorkspaces[0]?.id || 1)
    } else {
      const defaultWorkspace = {
        id: Date.now(),
        name: 'Workspace 1',
        notes: [],
      }

      setWorkspaces([defaultWorkspace])
      localStorage.setItem(localStorageKey, JSON.stringify([defaultWorkspace]))
    }
  }, [])

  const addWorkspace = () => {
    if (workspaces.length >= 3) return

    let newName = `Workspace ${workspaces.length + 1}`
    const existingNames = workspaces.map((ws) => ws.name)

    while (existingNames.includes(newName)) {
      newName = `Workspace ${parseInt(newName.split(' ')[1]) + 1}`
    }

    const newWorkspace = {
      id: Date.now(),
      name: newName,
      notes: [],
    }

    const updatedWorkspaces = [...workspaces, newWorkspace]
    setWorkspaces(updatedWorkspaces)
    setActiveWorkspaceId(newWorkspace.id)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const switchWorkspace = (id: number) => {
    setActiveWorkspaceId(id)
  }

  const deleteWorkspace = (id: number) => {
    if (workspaces.length <= 1) return
    const updatedWorkspaces = workspaces.filter((ws) => ws.id !== id)
    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))

    if (updatedWorkspaces.length === 0) {
      const defaultWorkspace = {
        id: Date.now(),
        name: 'Workspace 1',
        notes: [],
      }

      setWorkspaces([defaultWorkspace])
      setActiveWorkspaceId(defaultWorkspace.id)
      localStorage.setItem(localStorageKey, JSON.stringify([defaultWorkspace]))
    } else if (activeWorkspaceId === id) {
      setActiveWorkspaceId(updatedWorkspaces[0].id)
    }
  }

  const renameWorkspace = (id: number, newName: string) => {
    if (workspaces.some((ws) => ws.name === newName)) return
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === id ? { ...ws, name: newName } : ws
    )

    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const addNote = (workspaceId: number, note: TNote) => {
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === workspaceId ? { ...ws, notes: [...ws.notes, note] } : ws
    )

    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const updateNoteProgress = (
    workspaceId: number,
    noteId: number,
    newProgress: string
  ) => {
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === workspaceId
        ? {
            ...ws,
            notes: ws.notes.map((note) =>
              note.id === noteId ? { ...note, progress: newProgress } : note
            ),
          }
        : ws
    )
    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const deleteNote = (workspaceId: number, noteId: number) => {
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === workspaceId
        ? {
            ...ws,
            notes: ws.notes.filter((note) => note.id !== noteId),
          }
        : ws
    )
    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const updateNoteText = (
    workspaceId: number,
    noteId: number,
    newText: string
  ) => {
    const updatedWorkspaces = workspaces.map((ws) =>
      ws.id === workspaceId
        ? {
            ...ws,
            notes: ws.notes.map((note) =>
              note.id === noteId ? { ...note, text: newText } : note
            ),
          }
        : ws
    )
    setWorkspaces(updatedWorkspaces)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedWorkspaces))
  }

  const activeWorkspace = workspaces.find((ws) => ws.id === activeWorkspaceId)
  const activeWorkspaceName = activeWorkspace?.name || ''
  const activeWorkspaceNotesCount = activeWorkspace?.notes.length || 0

  return (
    <div className='container'>
      <div className={styles.content}>
        <WorkspacePanel
          workspaces={workspaces}
          addWorkspace={addWorkspace}
          switchWorkspace={switchWorkspace}
          deleteWorkspace={deleteWorkspace}
          renameWorkspace={renameWorkspace}
          activeWorkspaceId={activeWorkspaceId}
        />

        {activeWorkspace && (
          <Workspace
            workspace={activeWorkspace}
            addNote={addNote}
            updateNoteProgress={updateNoteProgress}
            deleteNote={deleteNote}
            updateNoteText={updateNoteText}
            workspaceName={activeWorkspaceName}
            notesCount={activeWorkspaceNotesCount}
          />
        )}
      </div>
    </div>
  )
}
