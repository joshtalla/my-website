import { useState, useEffect, useCallback } from 'react';
import ClickGame from './ClickGame';
import './KonamiGame.css';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export default function KonamiGame() {
    const [sequence, setSequence] = useState<string[]>([]);
    const [isGameVisible, setIsGameVisible] = useState(false);

    const resetSequence = useCallback(() => {
        setSequence([]);
    }, []);

    const showGame = useCallback(() => {
        setIsGameVisible(true);
        document.body.style.overflow = 'hidden';
        resetSequence();
    }, [resetSequence]);

    const hideGame = useCallback(() => {
        setIsGameVisible(false);
        document.body.style.overflow = '';
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Don't trigger if user is typing in an input field
        const target = e.target as HTMLElement;
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target.isContentEditable ||
            isGameVisible) {
            return;
        }

        const key = e.code;

        setSequence(prevSequence => {
            const newSequence = [...prevSequence, key];

            // Check if the key matches the expected position in the Konami code
            const expectedKey = KONAMI_CODE[prevSequence.length];

            if (key === expectedKey) {
                // If we've completed the sequence
                if (newSequence.length === KONAMI_CODE.length) {
                    setTimeout(showGame, 100); // Small delay for better UX
                    return [];
                }
                return newSequence;
            } else {
                // Reset if wrong key (unless it's the first key of the sequence)
                if (key === KONAMI_CODE[0]) {
                    return [key];
                }
                return [];
            }
        });
    }, [isGameVisible, showGame]);

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            hideGame();
        }
    }, [hideGame]);

    const handleEscapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isGameVisible) {
            hideGame();
        }
    }, [isGameVisible, hideGame]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (isGameVisible) {
            document.addEventListener('keydown', handleEscapeKey);
            return () => document.removeEventListener('keydown', handleEscapeKey);
        }
    }, [isGameVisible, handleEscapeKey]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isGameVisible) {
                document.body.style.overflow = '';
            }
        };
    }, [isGameVisible]);

    if (!isGameVisible) {
        return null;
    }

    return (
        <div
            className="konami-game__overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="konami-game-title"
        >
            <div className="konami-game__modal">
                <div className="konami-game__header">
                    <h2 id="konami-game-title">🎮 Secret Game Unlocked!</h2>
                    <button
                        className="konami-game__close"
                        onClick={hideGame}
                        aria-label="Close game"
                    >
                        ✕
                    </button>
                </div>
                <div className="konami-game__content">
                    <p className="konami-game__subtitle">
                        You found the hidden game! Nice work with the Konami code.
                    </p>
                    <ClickGame />
                </div>
            </div>
        </div>
    );
}