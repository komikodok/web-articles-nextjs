import React from 'react'
import RegisterForm from '@/components/auth/RegisterForm'
import { SessionProvider } from 'next-auth/react'

const Register = () => {
  return (
    <div className='p-5 w-82 flex flex-col gap-5'>
      <SessionProvider>
        <RegisterForm></RegisterForm>
      </SessionProvider>
    </div>
  )
}

export default Register
