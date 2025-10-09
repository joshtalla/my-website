import { useState, useEffect, useCallback } from 'react';
import './ClickGame.css';

interface GameState {
    score: number;
    timeLeft: number;
    gameActive: boolean;
    highScore: number;
}

export default function ClickGame() {
    const [gameState, setGameState] = useState<GameState>({
        score: 0,
        timeLeft: 10,
        gameActive: false,
        highScore: parseInt(localStorage.getItem('clickGameHighScore') || '0')
    });

    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

    const startGame = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            score: 0,
            timeLeft: 10,
            gameActive: true
        }));
        generateNewTarget();
    }, []);

    const generateNewTarget = useCallback(() => {
        setTargetPosition({
            x: Math.random() * 80 + 10, // 10% to 90% to avoid edges
            y: Math.random() * 60 + 20  // 20% to 80% to avoid edges
        });
    }, []);

    const handleTargetClick = useCallback(() => {
        if (!gameState.gameActive) return;

        setGameState(prev => ({
            ...prev,
            score: prev.score + 1
        }));
        generateNewTarget();
    }, [gameState.gameActive, generateNewTarget]);

    const endGame = useCallback(() => {
        setGameState(prev => {
            const newHighScore = Math.max(prev.score, prev.highScore);
            if (newHighScore > prev.highScore) {
                localStorage.setItem('clickGameHighScore', newHighScore.toString());
            }
            return {
                ...prev,
                gameActive: false,
                highScore: newHighScore
            };
        });
    }, []);

    // Timer effect
    useEffect(() => {
        if (!gameState.gameActive || gameState.timeLeft <= 0) {
            if (gameState.gameActive && gameState.timeLeft <= 0) {
                endGame();
            }
            return;
        }

        const timer = setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                timeLeft: prev.timeLeft - 1
            }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [gameState.gameActive, gameState.timeLeft, endGame]);

    return (
        <div className="click-game">
            <div className="click-game__header">
                <h3>🎯 Quick Click Challenge</h3>
                <div className="click-game__stats">
                    <span>Score: {gameState.score}</span>
                    <span>Time: {gameState.timeLeft}s</span>
                    <span>Best: {gameState.highScore}</span>
                </div>
            </div>

            <div className="click-game__arena">
                {!gameState.gameActive && gameState.timeLeft === 10 && (
                    <div className="click-game__start">
                        <button
                            onClick={startGame}
                            className="click-game__start-btn"
                        >
                            Start Game
                        </button>
                        <p>Click the moving target as fast as you can!</p>
                    </div>
                )}

                {!gameState.gameActive && gameState.timeLeft < 10 && (
                    <div className="click-game__end">
                        <h4>Game Over!</h4>
                        <p>Final Score: {gameState.score}</p>
                        {gameState.score === gameState.highScore && gameState.score > 0 && (
                            <p className="click-game__new-record">🎉 New Record!</p>
                        )}
                        <button
                            onClick={startGame}
                            className="click-game__start-btn"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {gameState.gameActive && (
                    <button
                        className="click-game__target"
                        style={{
                            left: `${targetPosition.x}%`,
                            top: `${targetPosition.y}%`
                        }}
                        onClick={handleTargetClick}
                        aria-label="Click target"
                    >
                        🎯
                    </button>
                )}
            </div>
        </div>
    );
}