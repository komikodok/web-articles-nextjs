"use client"

import Image from "next/image"
import { Lobster } from "next/font/google"
import { useRouter } from "next/navigation"
import { useState } from "react"


const lobster = Lobster({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lobster',
  weight: ['400']
});

const NavbarLogo = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      onClick={() => router.push("/dashboard")} 
      className="flex items-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image 
          src="/logo.png" 
          alt="logo" 
          width={48} 
          height={48} 
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <h2 className={`${lobster.className} font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-500 ml-2 transition-all duration-300 ${isHovered ? 'tracking-wider' : ''}`}>
        Artics
      </h2>
      
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}

export default NavbarLogo