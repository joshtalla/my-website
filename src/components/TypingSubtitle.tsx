import { useState, useEffect } from 'react';
import './TypingSubtitle.css';

interface TypingSubtitleProps {
    onComplete?: () => void;
}

export default function TypingSubtitle({ onComplete }: TypingSubtitleProps) {
    const phrases = ["Full-Stack Developer", "AI Researcher", "UX Enthusiast"];
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            const current = phrases[currentPhrase];

            if (!isDeleting) {
                // Typing
                if (currentText.length < current.length) {
                    setCurrentText(current.substring(0, currentText.length + 1));
                    setTypingSpeed(Math.max(50, Math.random() * 100));
                } else {
                    // Pause at end
                    setTimeout(() => {
                        setIsDeleting(true);
                        setTypingSpeed(40);
                    }, 1500);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(current.substring(0, currentText.length - 1));
                    setTypingSpeed(30);
                } else {
                    // Move to next phrase
                    setIsDeleting(false);
                    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                    setTypingSpeed(100);

                    // If we've completed a full cycle, call onComplete callback
                    if (currentPhrase === phrases.length - 1 && onComplete) {
                        onComplete();
                    }
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentPhrase, currentText, isDeleting, typingSpeed, phrases, onComplete]);

    return (
        <h2 className="typing-subtitle">
            <span className="typing-subtitle__text">{currentText}</span>
            <span className="typing-subtitle__cursor"></span>
        </h2>
    );
}
