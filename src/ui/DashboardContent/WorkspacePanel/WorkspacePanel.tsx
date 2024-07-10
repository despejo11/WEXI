'use client'

import styles from './style.module.scss'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { TWorkspacePanelProps } from './types'
import { TWorkspace } from '../types'

import { HiViewGridAdd } from 'react-icons/hi'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'
import { IoCheckmark } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

export default function WorkspacePanel({
  workspaces,
  addWorkspace,
  switchWorkspace,
  deleteWorkspace,
  renameWorkspace,
  activeWorkspaceId,
}: TWorkspacePanelProps) {
  const [editingWorkspaceId, setEditingWorkspaceId] = useState<number | null>(
    null
  )
  const [newName, setNewName] = useState<string>('')
  const [currentName, setCurrentName] = useState<string>('')
  const [showQuestion, setShowQuestion] = useState<number | null>(null)

  const isDuplicateName = (name: string) =>
    workspaces.some((workspace) => workspace.name === name)

  const handleRename = (id: number) => {
    if (
      newName.trim() === '' ||
      (newName.trim() !== currentName && isDuplicateName(newName.trim()))
    )
      return
    renameWorkspace(id, newName)
    setEditingWorkspaceId(null)
    setNewName('')
  }

  const startEditing = (workspace: TWorkspace) => {
    setEditingWorkspaceId(workspace.id)
    setNewName(workspace.name)
    setCurrentName(workspace.name)
  }

  return (
    <div className={styles.content}>
      <p className={styles.title}>WORKSPACES</p>

      <button
        className={`${styles.addWorkspace} ${
          workspaces.length < 3 ? '' : styles.addWorkspaceDisabled
        }`}
        onClick={addWorkspace}
        disabled={workspaces.length >= 3 || editingWorkspaceId !== null}
      >
        <span className={styles.icon}>
          <HiViewGridAdd />
        </span>
        Add Workspace
      </button>

      <div className={styles.workspaces}>
        <AnimatePresence>
          {workspaces.map((workspace) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key={workspace.id}
              className={styles.workspaceContainer}
            >
              <AnimatePresence mode='wait'>
                {editingWorkspaceId === workspace.id ? (
                  <motion.div
                    key='editContainer'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.editContainer}
                  >
                    <input
                      className={styles.editInput}
                      type='text'
                      id='editInput'
                      autoComplete='off'
                      placeholder='Type Something'
                      maxLength={11}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                      className={`${styles.save} ${
                        newName.trim() === '' ||
                        (newName.trim() !== currentName &&
                          isDuplicateName(newName.trim()))
                          ? styles.saveDisabled
                          : ''
                      }`}
                      onClick={() => handleRename(workspace.id)}
                      disabled={
                        newName.trim() === '' ||
                        (newName.trim() !== currentName &&
                          isDuplicateName(newName.trim()))
                      }
                    >
                      <FaSave />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key='workspaceButton'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={
                      workspace.id === activeWorkspaceId
                        ? styles.activeWorkspace
                        : styles.workspace
                    }
                    onClick={() =>
                      editingWorkspaceId === null &&
                      switchWorkspace(workspace.id)
                    }
                    disabled={editingWorkspaceId !== null}
                  >
                    {workspace.name}
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence mode='wait'>
                {showQuestion !== workspace.id ? (
                  <motion.div
                    key='workspaceActions'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.workspaceActions}>
                      <button
                        className={`${styles.edit} ${
                          workspace.id !== activeWorkspaceId ||
                          editingWorkspaceId === workspace.id
                            ? styles.editDisabled
                            : ''
                        }`}
                        onClick={() => startEditing(workspace)}
                        disabled={
                          workspace.id !== activeWorkspaceId ||
                          editingWorkspaceId === workspace.id
                        }
                      >
                        <MdEdit />
                      </button>

                      <button
                        className={`${styles.delete} ${
                          workspace.id !== activeWorkspaceId ||
                          workspaces.length <= 1
                            ? styles.deleteDisabled
                            : ''
                        }`}
                        onClick={() => setShowQuestion(workspace.id)}
                        disabled={
                          workspace.id !== activeWorkspaceId ||
                          workspaces.length <= 1
                        }
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key='showQuestion'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.showQuestion}
                  >
                    <p className={styles.question}>Are You Sure?</p>

                    <button
                      className={styles.no}
                      onClick={() => setShowQuestion(null)}
                    >
                      <RxCross2 />
                    </button>
                    <button
                      className={styles.yes}
                      onClick={() => deleteWorkspace(workspace.id)}
                    >
                      <IoCheckmark />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
