import Header from '@/ui/Header/Header'
import DashboardContent from '@/ui/DashboardContent/DashboardContent'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WEXI/Dashboard',
  description: 'Maximize your day’s productivity with WEXI!',
}

export default function Dashboard() {
  return (
    <>
      <Header />
      <DashboardContent />
    </>
  )
}
