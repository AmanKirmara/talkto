'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ProfilePage() {
    const router = useRouter();

    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/me')
            console.log(response.data.data._id);
            setData(response.data.data._id)
        } catch (error: any) {
            console.log(error);
            router.push('/login')
        }
    }
 
    const logout = async () => {
        try {
            await axios.post('/api/users/logout')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
        }
    }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
      <Link href={'/'} className='text-blue-700 underline'>Home</Link>
      <h2 className="text-2xl font-semibold mb-6 text-black">Profile Page</h2>
      <hr />
      <h2 className='text-black mb-5'>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`} className='text-blue-700 underline'>{data}</Link>}</h2>
      <hr />
      <button onClick={logout} className='bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 focus:outline-none'>Logout</button>
      <button onClick={getUserDetails} className='my-3 bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700 focus:outline-none'>Get User Details</button>
</div>
</div>
  )
}
