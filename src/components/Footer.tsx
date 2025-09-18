import './Footer.css'

function IconInstagram() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconDiscord() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M20 4.5S18.5 6 16.5 6c0 0-.5 1.5-2 1.5s-2-1.5-2-1.5C9.5 6 8 4.5 8 4.5 5.5 4.5 4 7 4 7v8s1.5 2.5 4 2.5c0 0 1-.5 2-1 1 0 2 1 2 1 2.5 1 4 .5 4 .5 2.5 0 4-2.5 4-2.5V7s-1.5-2.5-4-2.5z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconLinkedIn() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3.5 9h3v10h-3zM14.5 9c-1.2 0-2 .6-2.5 1.2V9h-3v10h3v-5c0-1 .4-2 1.8-2s2 1 2 2v5h3v-6.5c0-3.6-1.9-5.5-4.3-5.5z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function IconMail() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 7.5v9a2 2 0 002 2h14a2 2 0 002-2v-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 7.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer__left">
                <div className="site-footer__socials" aria-label="Social links">
                    <a className="site-footer__link" href="https://www.instagram.com/josh_talla?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <IconInstagram />
                    </a>
                    <a className="site-footer__link" href="https://discord.com/users/572977696993181736" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                        <IconDiscord />
                    </a>
                    <a className="site-footer__link" href="https://www.linkedin.com/in/josh-talla-9412252a1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <IconLinkedIn />
                    </a>
                    <a className="site-footer__link" href="mailto:joshtalla2@gmail.com" aria-label="Email">
                        <IconMail />
                    </a>
                </div>
            </div>

            <div className="site-footer__right">
                <div className="site-footer__made">Made with ❤️ — <strong>Josh Talla</strong></div>
            </div>
        </footer>
    )
}
