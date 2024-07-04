'use client'

import './style.scss'

import { useState } from 'react'
import DatePicker from 'react-datepicker'

export default function DatePickerTodo() {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      className='datePicker'
      placeholderText='Pick a Date'
      id='datePicker'
      autoComplete='off'
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  )
}
