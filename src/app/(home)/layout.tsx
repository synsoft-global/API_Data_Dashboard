import Header from '@/components/layouts/header/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container p-4 w-full">
      <Header />
      {children}
    </div>
  )
}
