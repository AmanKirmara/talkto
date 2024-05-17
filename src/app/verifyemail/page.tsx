'use client'
import axios from 'axios'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {

    // const router = useRouter()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
       try {
         const response = await axios.post("/api/users/verifyemail", { token })
         setVerified(true)
         setError(false)
       } catch (error:any) {
        setError(true)
        console.log(error?.response.data)
       }
    }

    useEffect(() => {
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const {query} = router;
        // const urlTokenTwo = query.token
    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
            <h2 className='text-black'>Verified</h2>
            <Link href="/login" className='text-black'>Login</Link>
        </div>
      )}
      {error && (
        <div>
            <h2 className='text-black'>Error</h2>
        </div>
      )}
    </div>
  </div>
  )

}
