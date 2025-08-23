"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound, UserStar, LogOut, UserRoundPen, CreditCard, Users } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

export function NavbarAvatar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex justify-center items-center bg-gradient-to-r from-rose-500/20 to-orange-400/20 cursor-pointer w-12 h-12 rounded-full relative group transition-all duration-300 hover:from-rose-500/30 hover:to-orange-400/30">
          {session.user.role === "User" ? (
            <UserRound width={36} height={36} strokeWidth={0} className="fill-rose-600/80 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <UserStar width={36} height={36} strokeWidth={0} className="fill-rose-600/80 transition-transform duration-300 group-hover:scale-110" />
          )}
          
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          
          {isOpen && (
            <div className="absolute inset-0 border-2 border-rose-400/50 rounded-full animate-ping"></div>
          )}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 p-2 shadow-xl border border-gray-100 rounded-xl"
        align="end"
      >
        <DropdownMenuLabel className="p-3">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{session.user.username}</span>
            <span className="text-xs text-rose-600 bg-rose-100 px-2 py-1 rounded-full w-fit mt-1">
              {session.user.role}
            </span>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer data-[highlighted]:bg-rose-50 transition-colors">
          <UserRoundPen className="size-4 text-rose-600" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer data-[highlighted]:bg-rose-50 transition-colors">
          <CreditCard className="size-4 text-rose-600" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg cursor-pointer data-[highlighted]:bg-rose-50 transition-colors">
          <Users className="size-4 text-rose-600" />
          <span>Team</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem 
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer data-[highlighted]:bg-rose-50 transition-colors"
          onClick={() => signOut({callbackUrl: "/login"})}
        >
          <LogOut className="size-4 text-rose-600" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}