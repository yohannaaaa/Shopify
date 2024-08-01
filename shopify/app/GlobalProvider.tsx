import React, { Children } from 'react'
import { CartProvider } from '@/context/CartContext'

function GlobalProvider({Children}) {
  return (<CartProvider>{Children}</CartProvider>
  )
}

export default GlobalProvider