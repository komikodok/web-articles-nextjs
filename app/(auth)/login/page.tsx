import LoginForm from "@/components/auth/LoginForm"
import { SessionProvider } from "next-auth/react"

const Login = () => {
  return (
    <div className='p-5 w-82 flex flex-col gap-5'>
      <SessionProvider>
        <LoginForm></LoginForm>
      </SessionProvider>
    </div>
  )
}

export default Login
