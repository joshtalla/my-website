import './Navbar.css'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const close = () => setOpen(false)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="Main navigation">
                <div className="navbar__brand">
                    <a href="#home">Josh Talla</a>
                </div>
                <ul className="navbar__links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                {/* floating hamburger for small screens / global access */}
                <button
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    className={`hamburger ${open ? 'is-open' : ''}`}
                    onClick={() => setOpen(v => !v)}
                >
                    <span />
                </button>
            </nav>

            {/* overlay + side drawer */}
            <div className={`side-overlay ${open ? 'is-open' : ''}`} onClick={close} aria-hidden={open ? 'false' : 'true'} />
            <aside className={`side-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
                <button className="side-drawer__close" onClick={close} aria-label="Close navigation">×</button>
                <nav className="side-drawer__nav">
                    <a href="#home" onClick={close}>Home</a>
                    <a href="#about" onClick={close}>About</a>
                    <a href="#projects" onClick={close}>Projects</a>
                    <a href="#contact" onClick={close}>Contact</a>
                </nav>
            </aside>
        </>
    )
}
