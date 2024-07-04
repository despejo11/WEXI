'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'

import { customStyles } from './customStyles'

const progress = [
  { value: 'Not started', label: 'Not started' },
  { value: 'In progress', label: 'In progress' },
]

export default function SelectProgress() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const maxLength = 11

  const handleInputChange = (inputValue: string) => {
    return inputValue.length > maxLength
      ? inputValue.slice(0, maxLength)
      : inputValue
  }

  return (
    <Select
      placeholder='Progress'
      isClearable
      isSearchable
      options={progress}
      styles={customStyles}
      onInputChange={handleInputChange}
    />
  )
}
