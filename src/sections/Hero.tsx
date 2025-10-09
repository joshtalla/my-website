import { useState } from 'react'
import TypingSubtitle from '../components/TypingSubtitle'
import './Hero.css'

export default function Hero() {
    const [typingDone, setTypingDone] = useState(false)

    const handleTypingComplete = () => {
        setTypingDone(true);
    };

    return (
        <section
            className={`hero ${typingDone ? 'hero--typing-done' : ''}`}
            id="home"
        >
            <div className="hero__content">
                <h1 className="hero__title">
                    Josh Talla
                </h1>
                <TypingSubtitle onComplete={handleTypingComplete} />
                <p className="hero__description">
                    Crafting intelligent solutions at the intersection of
                    <span className="hero__highlight"> AI</span> and
                    <span className="hero__highlight"> web development</span>
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="hero__cta">
                        View My Work
                    </a>
                    <a href="#contact" className="hero__cta hero__cta--secondary">
                        Get In Touch
                    </a>
                </div>
            </div>
        </section>
    )
}
