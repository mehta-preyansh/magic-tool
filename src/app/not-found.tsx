import { FrownIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
      <div className="flex gap-2 items-center justify-center">
        <h1 className="text-5xl font-bold inline-block">4</h1>
        <FrownIcon size={45}/>
        <h1 className="text-5xl font-bold inline-block">4</h1>
      </div>
      <p className="text-xl">Page Not Found</p>
      <span>Looks like you're trying to acces a resource that is not yet created or has shifted to a different address</span>
      <Link
        href="/"
        className="bg-info text-background px-6 py-2 rounded-3xl hover:bg-info/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound