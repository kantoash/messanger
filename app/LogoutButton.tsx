"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function LogoutButton() {
  return (
    <button onClick={() => signOut()}  className='button'>
        Sign Out
    </button>
  )
}



export default LogoutButton