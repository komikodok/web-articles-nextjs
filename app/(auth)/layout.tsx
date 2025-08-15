import IAuthLayout from '@/types/auth-layout-props.type'
import React from 'react'

const AuthLayout = ({ children }: IAuthLayout) => {
  return (
	<div className='h-screen w-screen flex'>
		<div className='w-1/2 h-full flex-shrink-0 border max-lg:hidden bg-black'>

		</div>

		<div className='w-1/2 h-full mx-auto flex justify-center lg:items-center'>
			{children}
		</div>
	</div>
  )
}

export default AuthLayout
