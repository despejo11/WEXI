'use client'

import styles from './style.module.scss'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'

import WorkspacePanel from './WorkspacePanel/WorkspacePanel'
import Workspace from './Workspace/Workspace'
import Statistics from './Statistics/Statistics'

import { TWorkspace, TNote } from './types'

import { FaArrowUp } from 'react-icons/fa6'

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
      setActiveWorkspaceId(defaultWorkspace.id)
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
    if (id === activeWorkspaceId) return

    const scrollY = window.scrollY
    const screenWidth = window.innerWidth

    setActiveWorkspaceId(id)

    if (screenWidth > 800 && scrollY > 180) {
      gsap.to(window, {
        duration: 1.3,
        scrollTo: { y: 180 },
        ease: 'expo.inOut',
      })
    }
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

  const totalNotesCount = workspaces.reduce(
    (acc, ws) => acc + ws.notes.length,
    0
  )

  const scrollToTop = () => {
    gsap.to(window, { duration: 1.7, scrollTo: { y: 0 }, ease: 'expo.inOut' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1 }}
      className={styles.background}
    >
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

          <AnimatePresence mode='wait'>
            {activeWorkspace && (
              <motion.div
                key={activeWorkspaceId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Workspace
                  workspace={activeWorkspace}
                  addNote={addNote}
                  updateNoteProgress={updateNoteProgress}
                  deleteNote={deleteNote}
                  updateNoteText={updateNoteText}
                  workspaceName={activeWorkspaceName}
                  notesCount={activeWorkspaceNotesCount}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode='wait'>
          {totalNotesCount > 0 && (
            <motion.div
              key='statistics'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.statistics}
            >
              <Statistics workspaces={workspaces} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {totalNotesCount > 0 && (
            <motion.button
              key='scrollToTop'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={scrollToTop}
              className={styles.scrollToTop}
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
