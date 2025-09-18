import './Hero.css'
import { useEffect, useRef, useState } from 'react'
import HeroBg from '../components/HeroBg'
import TypingSubtitle from '../components/TypingSubtitle'

export default function Hero() {
    const rootRef = useRef<HTMLElement | null>(null)
    const bgRef = useRef<HTMLDivElement | null>(null)
    const [typingDone] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        const root = rootRef.current
        const bg = bgRef.current
        if (!root || !bg) return

        let rafId: number | null = null
        let pointerX = 0
        let pointerY = 0
        let targetX = 0
        let targetY = 0
        let targetScroll = 0

        const onPointerMove = (e: PointerEvent) => {
            const rect = root.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            // stronger multiplier for a more visible parallax effect
            targetX = (e.clientX - cx) * 0.06
            targetY = (e.clientY - cy) * 0.06
            requestFrame()
        }

        const onScroll = () => {
            const rect = root.getBoundingClientRect()
            const winH = window.innerHeight || document.documentElement.clientHeight
            // how far the section's center is from viewport center in ratio [-1,1]
            const sectionCenter = rect.top + rect.height / 2
            const dist = (sectionCenter - winH / 2) / (winH / 2)
            // translate by up to +/- 20px vertically
            targetScroll = dist * 20
            requestFrame()
        }

        const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

        function animate() {
            // interpolate values for smooth motion (faster lerp for snappier response)
            pointerX = lerp(pointerX, targetX, 0.18)
            pointerY = lerp(pointerY, targetY, 0.18)

            // set CSS variables on bg element (guard for null)
            if (bg) {
                bg.style.setProperty('--bg-translate-x', `${pointerX.toFixed(2)}px`)
                bg.style.setProperty('--bg-translate-y', `${pointerY.toFixed(2)}px`)
                bg.style.setProperty('--bg-scroll-y', `${targetScroll.toFixed(2)}px`)
            }

            rafId = window.requestAnimationFrame(animate)
        }

        function requestFrame() {
            if (rafId == null) rafId = window.requestAnimationFrame(animate)
        }

        // compute navbar height and expose it to CSS so the hero can fill the remaining viewport
        const computeNavHeight = () => {
            try {
                const nav = document.querySelector('.navbar') as HTMLElement | null
                const navH = nav ? nav.getBoundingClientRect().height : 0
                root.style.setProperty('--nav-height', `${navH}px`)
            } catch (e) {
                // ignore
            }
        }

        // compute initially and on resize
        computeNavHeight()
        window.addEventListener('resize', computeNavHeight, { passive: true })

        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })
        // trigger initial scroll compute
        onScroll()
        requestFrame()

        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', computeNavHeight)
            if (rafId != null) cancelAnimationFrame(rafId)
        }
    }, [])

    // typing state is handled in TypingSubtitle; keep typingDone for CSS class parity

    return (
        <section className="home__hero" id="home" ref={rootRef}>
            <HeroBg ref={bgRef} />
            <div className="home__hero__content">
                <h1 className="home__title">Building Intelligent and User-Centric Web Applications</h1>
                <TypingSubtitle text="Welcome to my site! :)" className={typingDone ? 'typed' : ''} />
                <div className="home__actions">
                    <a className="btn" href="#projects">View Projects</a>
                    <a className="btn btn--muted" href="#contact">Contact</a>
                </div>
            </div>
        </section>
    )
}
