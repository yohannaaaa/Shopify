import React from 'react'

export default function EditLayout({children}: {children : React.ReactNode}) {
  return (
    <main className='bg-gray-800'>
{children}
    </main>
  )
}
