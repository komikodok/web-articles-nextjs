import gsap from "gsap"

export function articleAnimate(target: string | React.RefObject<HTMLElement>) {
    const targetEl = typeof target === "string" ? target : target.current

    const tl = gsap.timeline()
    
    tl.to(targetEl, {
        y: 0,
        opacity: 1,
        ease: 'power1',
        stagger: 0.3
    })

    return tl
}