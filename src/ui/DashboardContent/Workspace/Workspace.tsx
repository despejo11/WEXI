'use client'

import styles from './style.module.scss'

import { useState, ChangeEvent } from 'react'

import SelectProgress from './SelectProgress/SelectProgress'
import DatePickerTodo from './DatePickerTodo/DatePickerTodo'
import TodoItems from '../TodoItems/TodoItems'

export default function Workspace() {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value.length <= 100) {
      setInputValue(value)
    }
  }

  return (
    <div className={styles.content}>
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
          <DatePickerTodo />
        </div>
        <SelectProgress />
      </div>
      <TodoItems />
    </div>
  )
}
