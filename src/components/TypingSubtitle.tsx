import { useEffect, useRef, useState } from 'react'

type Props = {
    text: string
    className?: string
}

export default function TypingSubtitle({ text, className = '' }: Props) {
    const elRef = useRef<HTMLParagraphElement | null>(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            setDone(true)
            if (elRef.current) elRef.current.textContent = text
            return
        }

        const el = elRef.current
        if (!el) return
        el.textContent = ''
        el.classList.add('typing')
        let i = 0
        const interval = 80
        const id = window.setInterval(() => {
            if (i < text.length) {
                el.textContent += text[i++]
            } else {
                window.clearInterval(id)
                el.classList.remove('typing')
                setDone(true)
            }
        }, interval)

        return () => window.clearInterval(id)
    }, [text])

    return <p ref={elRef} className={`home__subtitle ${done ? 'typed' : ''} ${className}`}>{text}</p>
}
