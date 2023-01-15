"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

function Providers({ session, children }: any) {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Providers