import gsap from "gsap";

export function formErrorAnimate(target: string | React.RefObject<HTMLElement>) {
    const targetEl = typeof target === "string" ? target : target.current
    
    gsap.fromTo(targetEl,  
        { x: 0 }, 
        { x: -10, yoyo: true, repeat: 3, duration: 0.1 }
    );
}