import AuthBanner from '@/components/auth/AuthBanner'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400']
})

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
	
	return (
		<div className='h-screen w-screen flex'>
			<div className='w-1/2 h-full bg-[tomato]/10 overflow-hidden flex-shrink-0 flex flex-col gap-2 justify-center items-center max-lg:hidden'>
				<AuthBanner />
			</div>

			<div className={`
				w-1/2 h-full mx-auto flex justify-center items-center
				${poppins.className}
			`}>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
