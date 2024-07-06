'use client'

import styles from './style.module.scss'

import { useState, ChangeEvent } from 'react'

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
    if (inputValue.trim() === '' || notesCount >= 10) return

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
    updateNoteText(workspace.id, noteId, editingText)
    setEditingNoteId(null)
    setEditingText('')
  }

  const handleEditTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value)
  }

  return (
    <div className={styles.content}>
      <div className={styles.workspaceInfo}>
        <p className={styles.title}>{workspaceName}</p>
        {notesCount !== 0 && (
          <p className={styles.titled}>Number of Notes: {notesCount}</p>
        )}

        {notesCount >= 10 && (
          <p className={styles.limitMessage}>
            You cannot add more than 10 notes!
          </p>
        )}
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
          className={
            notesCount >= 10 ? styles.addButtonDisabled : styles.addButton
          }
          onClick={handleAddNote}
          disabled={notesCount >= 10}
        >
          <RiStickyNoteAddFill />
        </button>
      </div>

      {workspace.notes.length === 0 ? (
        <p className={styles.noNotes}>You have no notes!</p>
      ) : (
        <div className={styles.notes}>
          {workspace.notes.map((note) => (
            <div key={note.id} className={styles.note}>
              <div className={styles.header}>
                <p className={styles.date}>{note.date}</p>
                <p className={styles.progress}>{note.progress}</p>
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
                      className={
                        editingNoteId === note.id
                          ? styles.editDisabled
                          : styles.edit
                      }
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
                  className={
                    editingNoteId === note.id ? styles.hiddenText : styles.text
                  }
                >
                  {note.text}
                </p>

                {editingNoteId === note.id && (
                  <div className={styles.editing}>
                    <input
                      type='text'
                      id='editText'
                      autoComplete='off'
                      className={styles.editInput}
                      value={editingText}
                      onChange={handleEditTextChange}
                    />

                    <button
                      className={styles.save}
                      onClick={() => handleSaveEdit(note.id)}
                    >
                      <FaSave />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
