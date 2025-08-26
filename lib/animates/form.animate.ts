import gsap from "gsap"

export function formAnimate(target: string | React.RefObject<HTMLElement>) {
    const targetEl = typeof target === "string" ? target : target.current

    const tl = gsap.timeline()
    
    gsap.set(targetEl, {
        y: 20,
        opacity: 0,
    })
    
    tl.to(targetEl, {
        y: 0,
        opacity: 1,
        ease: 'power1',
        stagger: 0.3
    })

    return tl
}

export function formErrorAnimate(target: string | React.RefObject<HTMLElement>) {
    const targetEl = typeof target === "string" ? target : target.current
    
    const tl = gsap.timeline()

    gsap.fromTo(targetEl,  
        { x: 0 }, 
        { x: -10, yoyo: true, repeat: 3, duration: 0.1 }
    );

    return tl
}