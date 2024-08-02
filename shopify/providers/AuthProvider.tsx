import { AuthProvider } from "@/context/AuthContext";
function Auth_Provider({children}: {children : React.ReactNode}) {
    return (<AuthProvider>
        {children}
        </AuthProvider>
    )
  }
  
  export default Auth_Provider