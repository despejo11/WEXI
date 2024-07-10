'use client'

import styles from './style.module.scss'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

import { TStatisticsProps } from './types'

export default function Statistics({ workspaces }: TStatisticsProps) {
  const [workspaceCount, setWorkspaceCount] = useState<number>(0)
  const [noteCount, setNoteCount] = useState<number>(0)
  const [progressData, setProgressData] = useState<
    { name: string; value: number }[]
  >([])
  const [chartSize, setChartSize] = useState<{ width: number; height: number }>(
    { width: 380, height: 380 }
  )

  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth <= 800) {
        setChartSize({ width: 280, height: 280 })
      } else {
        setChartSize({ width: 380, height: 380 })
      }
    }

    updateChartSize()
    window.addEventListener('resize', updateChartSize)
    return () => window.removeEventListener('resize', updateChartSize)
  }, [])

  useEffect(() => {
    const totalWorkspaces = workspaces.length
    const totalNotes = workspaces.reduce((acc, ws) => acc + ws.notes.length, 0)
    const notStarted = workspaces.reduce(
      (acc, ws) =>
        acc + ws.notes.filter((note) => note.progress === 'Not started').length,
      0
    )
    const inProgress = workspaces.reduce(
      (acc, ws) =>
        acc + ws.notes.filter((note) => note.progress === 'In progress').length,
      0
    )
    const done = workspaces.reduce(
      (acc, ws) =>
        acc + ws.notes.filter((note) => note.progress === 'Done').length,
      0
    )

    setWorkspaceCount(totalWorkspaces)
    setNoteCount(totalNotes)
    setProgressData([
      { name: 'Not started', value: notStarted },
      { name: 'In progress', value: inProgress },
      { name: 'Done', value: done },
    ])
  }, [workspaces])

  const COLORS = ['#2a2b29', '#2c98e5', '#c9fd74']

  const getPercentage = (value: number) => {
    return ((value / noteCount) * 100).toFixed(2)
  }

  const getProgressClass = (value: number) => {
    const percentage = parseFloat(getPercentage(value))
    if (percentage === 0) {
      return styles.progressDataRed
    }
    if (percentage === 100) {
      return styles.progressDataGreen
    }
    return ''
  }

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <p className={styles.total}>
          Total Workspaces:{' '}
          <AnimatePresence mode='wait'>
            <motion.span
              key={workspaceCount}
              className={workspaceCount === 3 ? styles.maxQuantity : ''}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {workspaceCount}
            </motion.span>
          </AnimatePresence>
        </p>

        <p className={styles.total}>
          Total Notes:{' '}
          <AnimatePresence mode='wait'>
            <motion.span
              key={noteCount}
              className={noteCount === 30 ? styles.maxQuantity : ''}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {noteCount}
            </motion.span>
          </AnimatePresence>
        </p>

        <div className={styles.colors}>
          <p>
            <span className={styles.notStarted}></span> -
            <span className={styles.progress}>Not started</span>
            <AnimatePresence mode='wait'>
              <motion.span
                key={progressData[0]?.value || 0}
                className={`${styles.progressData} ${getProgressClass(
                  progressData[0]?.value || 0
                )}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.bracket}>(</span>
                {getPercentage(progressData[0]?.value || 0)}%
                <span className={styles.bracket}>)</span>
              </motion.span>
            </AnimatePresence>
          </p>

          <p>
            <span className={styles.inProgress}></span> -
            <span className={styles.progress}>In progress</span>
            <AnimatePresence mode='wait'>
              <motion.span
                key={progressData[1]?.value || 0}
                className={`${styles.progressData} ${getProgressClass(
                  progressData[1]?.value || 0
                )}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.bracket}>(</span>
                {getPercentage(progressData[1]?.value || 0)}%
                <span className={styles.bracket}>)</span>
              </motion.span>
            </AnimatePresence>
          </p>

          <p>
            <span className={styles.done}></span> -
            <span className={styles.progress}>Done</span>
            <AnimatePresence mode='wait'>
              <motion.span
                key={progressData[2]?.value || 0}
                className={`${styles.progressData} ${getProgressClass(
                  progressData[2]?.value || 0
                )}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.bracket}>(</span>
                {getPercentage(progressData[2]?.value || 0)}%
                <span className={styles.bracket}>)</span>
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
      </div>

      <PieChart width={chartSize.width} height={chartSize.height}>
        <Pie
          data={progressData}
          outerRadius={chartSize.width / 2}
          dataKey='value'
        >
          {progressData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}
