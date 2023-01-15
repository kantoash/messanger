"use client"
import { getProviders, signIn } from 'next-auth/react'
import React from 'react'

interface Props {
    providers: Awaited<ReturnType<typeof getProviders>>;
}



function SignInComp({ providers }: Props) {

  return (
    <div className='flex justify-center'>
        {Object.values(providers!).map((provider) => (
            <div key={provider.name}>
                <button onClick={() => signIn(provider.id, {
                    callbackUrl: process.env.VERCEL_URL || "http://localhost:3000"
                })}
 className='button'>
                    Sign in with {provider.name}
                </button>
            </div>
        ))}
    </div>
  )
}

export default SignInComp