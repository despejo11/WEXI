'use client'

import { customStyles } from './customStyles'

import { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'

import { TSelectProgressProps } from './types'

export default function SelectProgress({
  progress,
  setProgress,
}: TSelectProgressProps) {
  const progressOptions = [
    { value: 'Not started', label: 'Not started' },
    { value: 'In progress', label: 'In progress' },
  ]

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
      placeholder='Select a Progress'
      isSearchable
      options={progressOptions}
      styles={customStyles}
      onInputChange={handleInputChange}
      value={progressOptions.find((option) => option.value === progress)}
      onChange={(selectedOption) => {
        const option = selectedOption as SingleValue<{
          value: string
          label: string
        }>
        setProgress(option?.value || '')
      }}
    />
  )
}
