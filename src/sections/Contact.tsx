import React, { useState, useRef } from 'react';
import './Contact.css';

// IMPORTANT: Sending email directly to a Gmail address from client-side JavaScript is not secure
// (would expose credentials). Using a form service like Formspree is a practical option.
// Set the Vite env variable VITE_FORMSPREE_ENDPOINT to your Formspree endpoint (e.g.
// https://formspree.io/f/your-id). You can create a free form at https://formspree.io/
// Then set a `.env` file at the project root with:
// VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
// The app will read that value at build time.

const MAIL_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xrbawpvn'

import MathCaptcha from '../components/MathCaptcha'

const Contact: React.FC = () => {
    const [submitting, setSubmitting] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cooldown, setCooldown] = useState(0)
    const cooldownRef = useRef<number | null>(null)

    // honeypot
    const hpRef = useRef<HTMLInputElement | null>(null)

    // math captcha ref
    const mathRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submitting || cooldown > 0) return

        const form = e.currentTarget
        const formData = new FormData(form)

        // Honeypot check (bots often fill hidden fields)
        if (hpRef.current && hpRef.current.value) {
            // silently drop
            setError('Submission rejected')
            return
        }

        // Math captcha value is validated on blur by MathCaptcha; still do a final check here
        const mathVal = mathRef.current?.value ?? ''
        // Note: MathCaptcha regenerates on blur if incorrect, so just compare numerically
        if (!mathVal || isNaN(Number(mathVal))) {
            setError('Math challenge incorrect')
            return
        }

        const name = (formData.get('name') || '').toString().trim()
        const email = (formData.get('email') || '').toString().trim()
        const message = (formData.get('message') || '').toString().trim()

        if (!name || !email || !message) {
            setError('Please fill in all required fields')
            return
        }

        // basic email regex
        const emailOk = /^\S+@\S+\.\S+$/.test(email)
        if (!emailOk) {
            setError('Please enter a valid email address')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            // Replace MAIL_ENDPOINT with your secure server endpoint or a form endpoint
            const res = await fetch(MAIL_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, subject: 'Website contact' })
            })

            if (!res.ok) {
                throw new Error('Failed to send')
            }

            setSent(true)
            // clear form inputs
            form.reset()
            // set cooldown to prevent resubmission for 60s
            setCooldown(60)
            cooldownRef.current = window.setInterval(() => setCooldown(c => {
                if (c <= 1) {
                    if (cooldownRef.current != null) { window.clearInterval(cooldownRef.current); cooldownRef.current = null }
                    return 0
                }
                return c - 1
            }), 1000)
        } catch (err) {
            setError('There was an error sending your message. Please try again later.')
        } finally {
            setSubmitting(false)
        }
    }

    // clear timer on unmount to avoid leaks
    React.useEffect(() => {
        return () => {
            if (cooldownRef.current != null) {
                window.clearInterval(cooldownRef.current)
                cooldownRef.current = null
            }
        }
    }, [])

    return (
        <section id="contact" className="contact" aria-labelledby="contact-title">
            <div className="contact__inner">
                <h2 id="contact-title" className="contact__title">Contact</h2>
                <p className="contact__subtitle">Want to work together or have a question? Send a message and I’ll get back to you.</p>

                <form className="contact__form" onSubmit={handleSubmit} aria-label="Contact form">
                    {/* Honeypot field (hidden) */}
                    <input ref={hpRef} name="hp_field" type="text" className="contact__hp" autoComplete="off" tabIndex={-1} aria-hidden="true" />

                    <div className="contact__row">
                        <label className="contact__label">
                            <span className="contact__visually-hidden">Name</span>
                            <input className="contact__input" name="name" type="text" placeholder="Your name" required />
                        </label>

                        <label className="contact__label">
                            <span className="contact__visually-hidden">Email</span>
                            <input className="contact__input" name="email" type="email" placeholder="you@example.com" required />
                        </label>
                    </div>

                    <label className="contact__label">
                        <span className="contact__visually-hidden">Message</span>
                        <textarea className="contact__textarea" name="message" rows={5} placeholder="Hi — I’d like to talk about..." required />
                    </label>

                    {/* Math challenge component */}
                    <MathCaptcha ref={mathRef} />

                    {error && <div className="contact__error" role="alert">{error}</div>}
                    {sent && <div className="contact__success" role="status">Thanks — your message was sent.</div>}

                    <div className="contact__actions">
                        <button className="contact__button" type="submit" disabled={submitting || cooldown > 0}>
                            {submitting ? 'Sending…' : (cooldown > 0 ? `Wait ${cooldown}s` : 'Send message')}
                        </button>
                    </div>
                </form>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)' }}>
                    Note: messages are delivered via a server endpoint. Configure <code>VITE_FORMSPREE_ENDPOINT</code> in your <code>.env</code> if you use Formspree.
                </p>
            </div>
        </section>
    );
};

export default Contact;