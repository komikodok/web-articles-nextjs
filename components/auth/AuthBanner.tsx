"use client"

import Image from "next/image"
import { Playfair_Display } from "next/font/google"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useEffect } from "react"

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800']
})

const AuthBanner = () => {
    
    useEffect(() => {
        const tl = gsap.timeline()
        
        gsap.registerPlugin(SplitText)
    
        const header = SplitText.create(".head")
        const phar1 = SplitText.create('.phar-1')
        const phar2 = SplitText.create('.phar-2')

        tl.fromTo(header.chars, { y: -100, autoAlpha: 0 }, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            ease: 'power1'
        })
        .fromTo([phar1.chars, phar2.chars], { rotate: 360, x: -500, autoAlpha: 0 }, {
            rotate: 0,
            x: 0,
            autoAlpha: 1,
            stagger: 0.1,
            ease: 'power1'
        })
        .fromTo('#logo', { x: 500, y: -400, rotate: 280 }, {
            x: 0,
            y: 0,
            rotate: 0,
            duration: 4,
            ease: 'elastic(1, 0.4)'
        })
    })
    return (
        <>
        <h2 className={`head text-7xl text-[#cf381d] ${playfair.className}`}>
            Artics
        </h2>

        <div className={`
            text-3xl text-center text-[#ee4c30] flex justify-center items-center
            ${playfair.className}
        `}>
            <p className="phar-1">Create</p>
            <Image id="logo" src="/logo.png" width={52} height={52} alt="logo" />
            <p className="phar-2">Your Article</p>
        </div>
        </>
    )
}

export default AuthBanner
