"use client"

import { SessionProvider, useSession } from "next-auth/react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { NavbarAvatar } from "./NavbarAvatar"
import { LogIn, UserPlus } from "lucide-react"

const NavbarAuth = () => {
  const { status } = useSession()

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-3  mr-4">
        <Link 
          href="/register" 
          className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:text-rose-700 font-medium rounded-full transition-colors group"
        >
          <UserPlus className="size-4 transition-transform group-hover:scale-110" />
          Sign Up
        </Link>
        
        <Link 
          href="/login" 
          className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-400 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-orange-500 group"
        >
          <LogIn className="size-4 transition-transform group-hover:scale-110" />
          Sign In
        </Link>
      </div>
    )
  } else if (status === "authenticated") {
    return (
      <div className=" mr-4">
        <SessionProvider>
          <NavbarAvatar />
        </SessionProvider>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-3  mr-4">
        <Skeleton className="w-20 h-10 rounded-full" />
        <Skeleton className="w-20 h-10 rounded-full" />
      </div>
    )
  }
}

export default NavbarAuth