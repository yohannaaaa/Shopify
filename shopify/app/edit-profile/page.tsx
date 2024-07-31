'use client'
import React from 'react'
import Card from '../components/card'
import products from '../../public/Products.jpg'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth'

const formSchema = z.object({
  Fname: z.string().min(2, 'First name must be at least 2 characters'),
  Lname: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  oldPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters')
})

type FormField = z.infer<typeof formSchema>

const EditProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormField>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormField) => {
    const onSubmit = async (data: FormField) => {
      try {
        const auth = getAuth()
        const user = auth.currentUser
  
        await updateEmail(user!, data.email)
  
        await updatePassword(user!, data.newPassword)
  
        await updateProfile(user!, {
          displayName: `${data.Fname} ${data.Lname}`
        })
  
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user!.uid)
        await updateDoc(userDocRef, {
          firstName: data.Fname,
          lastName: data.Lname,
          email: data.email
        })
  
        console.log('Profile updated successfully')
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }  }

  return (
    <div className="flex items-center justify-center mt-14 bg-cover bg-center bg-no-repeat text-gray-800" style={{ backgroundImage: `url(${products})` }}>
      <Card>
        <h1 className='text-blue-400 font-semibold'>Edit your profile details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='p-3 grid grid-cols-2 gap-5 justify-around'>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>First Name</label>
            <input {...register('Fname')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='text' />
            {errors.Fname && <div className='text-red-400 text-xs'>{errors.Fname.message}</div>}
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Last Name</label>
            <input {...register('Lname')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='text' />
            {errors.Lname && <div className='text-red-400 text-xs'>{errors.Lname.message}</div>}
          </div>
          <div className='col-span-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input {...register('email')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='email' />
            {errors.email && <div className='text-red-400 text-xs'>{errors.email.message}</div>}
          </div>
          <div className='col-span-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Password Changes</label>
            <input {...register('oldPassword')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300 placeholder:text-sm' type='password' placeholder='Current Password' />
            {errors.oldPassword && <div className='text-red-400 text-xs'>{errors.oldPassword.message}</div>}
          </div>
          <div className='col-span-2'>
            <input {...register('newPassword')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300 placeholder:text-sm' type='password' placeholder='New Password' />
            {errors.newPassword && <div className='text-red-400 text-xs'>{errors.newPassword.message}</div>}
          </div>
          <div className='col-span-2'>
            <input {...register('confirmPassword')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300 placeholder:text-sm' type='password' placeholder='Confirm New Password' />
            {errors.confirmPassword && <div className='text-red-400 text-xs'>{errors.confirmPassword.message}</div>}
          </div>
          <div className='col-start-2'>
            <button type='button' className='text-gray-500 mr-10'>Cancel</button>
            <button type='submit' className='btn bg-blue-500 outline-none border-none text-white'>Save Changes</button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default EditProfile