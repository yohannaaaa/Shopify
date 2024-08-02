import React from 'react'
import { CartProvider } from '@/context/CartContext'

function GlobalProvider({children}: {children : React.ReactNode}) {
  return (<CartProvider>{children}</CartProvider>
  )
}

export default GlobalProvider