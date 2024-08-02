import React from 'react'
import { AuthProvider } from "firebase/auth";
function AuthProvider({children}: {children : React.ReactNode}) {
    return (<AuthProvider children={children}>
        {children}
        </AuthProvider>
    )
  }
  
  export default AuthProvider