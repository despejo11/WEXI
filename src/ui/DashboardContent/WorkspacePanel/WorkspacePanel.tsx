'use client'

import styles from './style.module.scss'

import { useState } from 'react'

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
  const [showQuestion, setShowQuestion] = useState<number | null>(null)

  const handleRename = (id: number) => {
    if (newName.trim() === '') return
    renameWorkspace(id, newName)
    setEditingWorkspaceId(null)
    setNewName('')
  }

  const startEditing = (workspace: TWorkspace) => {
    setEditingWorkspaceId(workspace.id)
    setNewName(workspace.name)
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
        {workspaces.map((workspace) => (
          <div key={workspace.id} className={styles.workspaceContainer}>
            {editingWorkspaceId === workspace.id ? (
              <div className={styles.editContainer}>
                <input
                  className={styles.editInput}
                  type='text'
                  id='editInput'
                  autoComplete='off'
                  maxLength={11}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  className={styles.save}
                  onClick={() => handleRename(workspace.id)}
                >
                  <FaSave />
                </button>
              </div>
            ) : (
              <button
                className={
                  workspace.id === activeWorkspaceId
                    ? styles.activeWorkspace
                    : styles.workspace
                }
                onClick={() =>
                  editingWorkspaceId === null && switchWorkspace(workspace.id)
                }
                disabled={editingWorkspaceId !== null}
              >
                {workspace.name}
              </button>
            )}

            <div className={styles.workspaceActions}>
              {showQuestion !== workspace.id ? (
                <>
                  <button
                    className={
                      workspace.id !== activeWorkspaceId ||
                      editingWorkspaceId === workspace.id
                        ? styles.editDisabled
                        : styles.edit
                    }
                    onClick={() => startEditing(workspace)}
                    disabled={
                      workspace.id !== activeWorkspaceId ||
                      editingWorkspaceId === workspace.id
                    }
                  >
                    <MdEdit />
                  </button>

                  <button
                    className={
                      workspace.id !== activeWorkspaceId ||
                      workspaces.length <= 1
                        ? styles.deleteDisabled
                        : styles.delete
                    }
                    onClick={() => setShowQuestion(workspace.id)}
                    disabled={
                      workspace.id !== activeWorkspaceId ||
                      workspaces.length <= 1
                    }
                  >
                    <MdDelete />
                  </button>
                </>
              ) : (
                <div className={styles.showQuestion}>
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
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
