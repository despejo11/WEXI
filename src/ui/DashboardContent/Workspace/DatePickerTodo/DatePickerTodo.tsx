'use client'

import './style.scss'

import DatePicker from 'react-datepicker'

import { TDatePickerTodoProps } from './types'

export default function DatePickerTodo({
  selectedDate,
  setSelectedDate,
}: TDatePickerTodoProps) {
  return (
    <DatePicker
      className='datePicker'
      placeholderText='Pick a Date'
      id='datePicker'
      autoComplete='off'
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  )
}
