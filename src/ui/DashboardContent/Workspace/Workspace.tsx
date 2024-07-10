'use client'

import styles from './style.module.scss'

import { useState, ChangeEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

import SelectProgress from './SelectProgress/SelectProgress'
import DatePickerTodo from './DatePickerTodo/DatePickerTodo'

import { TNote } from '../types'
import { TWorkspaceProps } from './types'

import { RiStickyNoteAddFill } from 'react-icons/ri'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'

export default function Workspace({
  workspace,
  addNote,
  updateNoteProgress,
  deleteNote,
  updateNoteText,
  workspaceName,
  notesCount,
}: TWorkspaceProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [progress, setProgress] = useState<string>('Not started')
  const [previousProgresses, setPreviousProgresses] = useState<{
    [key: number]: string
  }>({})
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState<string>('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value.length <= 100) {
      setInputValue(value)
    }
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  const handleAddNote = () => {
    if (
      inputValue.trim() === '' ||
      !selectedDate ||
      progress === '' ||
      notesCount >= 10
    )
      return

    const newNote: TNote = {
      id: Date.now(),
      text: inputValue,
      date: formatDate(selectedDate),
      progress: progress,
    }

    addNote(workspace.id, newNote)
    setInputValue('')
    setSelectedDate(new Date())
    setProgress('Not started')
  }

  const handleCheckboxChange = (noteId: number) => {
    const note = workspace.notes.find((note) => note.id === noteId)
    if (!note) return

    let newProgress: string

    if (note.progress === 'Done') {
      newProgress = previousProgresses[note.id] || 'Not started'
      const updatedPreviousProgresses = { ...previousProgresses }
      delete updatedPreviousProgresses[note.id]
      setPreviousProgresses(updatedPreviousProgresses)
    } else {
      newProgress = 'Done'
      setPreviousProgresses({ ...previousProgresses, [note.id]: note.progress })
    }

    updateNoteProgress(workspace.id, noteId, newProgress)
  }

  const handleDeleteNote = (noteId: number) => {
    deleteNote(workspace.id, noteId)
  }

  const handleEditNote = (noteId: number, currentText: string) => {
    setEditingNoteId(noteId)
    setEditingText(currentText)
  }

  const handleSaveEdit = (noteId: number) => {
    if (editingText.trim() === '') return
    updateNoteText(workspace.id, noteId, editingText)
    setEditingNoteId(null)
    setEditingText('')
  }

  const handleEditTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value.length <= 100) {
      setEditingText(event.target.value)
    }
  }

  const isAddButtonDisabled =
    inputValue.trim() === '' ||
    !selectedDate ||
    progress === '' ||
    notesCount >= 10

  return (
    <div className={styles.content}>
      <div className={styles.workspaceInfo}>
        <p className={styles.workspaceName}>{workspaceName}</p>

        <p
          className={`${styles.notesCount} ${
            notesCount !== 0 ? styles.notesCountVisible : ''
          }`}
        >
          Number of Notes: {notesCount}
        </p>

        <p
          className={`${styles.limitMessage} ${
            notesCount >= 10 ? styles.limitMessageVisible : ''
          }`}
        >
          You cannot add more than 10 notes!
        </p>
      </div>

      <div className={styles.addTodo}>
        <input
          className={styles.inputText}
          type='text'
          id='text'
          autoComplete='off'
          placeholder='Type Something'
          value={inputValue}
          onChange={handleInputChange}
        />
        <div>
          <DatePickerTodo
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <SelectProgress progress={progress} setProgress={setProgress} />

        <button
          className={`${styles.addButton} ${
            isAddButtonDisabled ? styles.addButtonDisabled : ''
          }`}
          onClick={handleAddNote}
          disabled={isAddButtonDisabled}
        >
          <RiStickyNoteAddFill />
        </button>
      </div>

      <LayoutGroup>
        <AnimatePresence mode='wait'>
          {workspace.notes.length === 0 ? (
            <motion.p
              key='noNotes'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.noNotes}
            >
              You have no notes!
            </motion.p>
          ) : (
            <motion.div
              key='notes'
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.notes}
            >
              <AnimatePresence>
                {workspace.notes.map((note) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    layout
                    key={note.id}
                    className={styles.note}
                  >
                    <div className={styles.header}>
                      <p className={styles.date}>{note.date}</p>
                      <AnimatePresence mode='wait'>
                        <motion.div
                          key={note.progress}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={styles.progressWrapper}
                        >
                          <p className={styles.progress}>{note.progress}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className={styles.main}>
                      <div className={styles.noteActions}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type='checkbox'
                            id={`checkbox-${note.id}`}
                            autoComplete='off'
                            checked={note.progress === 'Done'}
                            onChange={() => handleCheckboxChange(note.id)}
                          />
                          <svg viewBox='0 0 64 64'>
                            <path
                              d='M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16'
                              pathLength='575.0541381835938'
                              className={styles.path}
                            ></path>
                          </svg>
                        </label>

                        <div className={styles.buttons}>
                          <button
                            className={`${styles.edit} ${
                              editingNoteId === note.id
                                ? styles.editDisabled
                                : ''
                            }`}
                            disabled={editingNoteId === note.id}
                            onClick={() => handleEditNote(note.id, note.text)}
                          >
                            <MdEdit />
                          </button>

                          <button
                            className={styles.delete}
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>

                      <p
                        className={`${styles.text} ${
                          editingNoteId === note.id ? styles.hiddenText : ''
                        }`}
                      >
                        {note.text}
                      </p>

                      <AnimatePresence>
                        {editingNoteId === note.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className={styles.editing}
                          >
                            <input
                              type='text'
                              id='editText'
                              autoComplete='off'
                              placeholder='Type Something'
                              className={styles.editingInput}
                              value={editingText}
                              onChange={handleEditTextChange}
                            />
                            <button
                              className={`${styles.save} ${
                                editingText.trim() === ''
                                  ? styles.saveDisabled
                                  : ''
                              }`}
                              onClick={() => handleSaveEdit(note.id)}
                              disabled={editingText.trim() === ''}
                            >
                              <FaSave />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}
