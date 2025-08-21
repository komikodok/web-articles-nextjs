import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      credentials: {
        username: {label: "username", type: "text"},
        password: {label: "password", type: "password"}
      },
      async authorize(credentials) {
        try {

          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            username: credentials?.username,
            password: credentials?.password
          })
  
          const data = res.data
  
          if (!data) return null
          
          const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.token}`
            }
          })
  
          const userData = userRes.data
          
          if (!userData) return null
          
          return {
            ...userData,
            accessToken: data.token
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error("Axios error:", {
              url: err.config?.url,
              method: err.config?.method,
              status: err.response?.status,
              data: err.response?.data,
            })
          } else {
            console.error("Unexpected error:", err)
          }
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
        token.accessToken = user.accessToken
      }
      
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        username: token.username,
        role: token.role,
        accessToken: token.accessToken
      }
      
      return session
    },
    async authorized({ request: {nextUrl}, auth}) {
      const isLogin = !!auth?.user
  
      if (isLogin && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/articles", nextUrl))
      }

      // const user = auth?.user
      // const onlyAdminRoutes = ["/category"]

      // if (user?.role !== "Admin" && onlyAdminRoutes.includes(nextUrl.pathname)) {
      //   return false
      // }

      if (nextUrl.pathname === "/") {
        return Response.redirect(new URL("/articles", nextUrl))
      }

      return true
    },
  }
})