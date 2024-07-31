import React from 'react'
import Card from '../components/card'

const EditProfile = () => {
  return (
    <div className='flex items-center justify-center'>
      <Card>
        <h1 className='text-blue-400 font-semibold'>Edit your profile details</h1>
        <form action="" className='p-3 grid grid-cols-2 gap-5 justify-around'>
        <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>First Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='text' />
        </div>
        <div>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Last Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='text' />
        </div>
        <div className='col-span-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray bg-gray-300' type='email' />
        </div>
        </form>

      </Card>
    </div>
  )
}

export default EditProfile
