import Link from 'next/link'
import LoginForm from '../components/ui'


export default function LoginPage(){
  return(
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='shadow-xl p-4 rounded-xl'>
        <LoginForm/>
           
      </div>
      
    </div>
   
  )
}