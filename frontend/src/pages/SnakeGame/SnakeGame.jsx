import { useState, useEffect, useRef } from 'react';
import "./SnakeGame.css";

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]); 
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: -1 });
    const [nextDirection, setNextDirection] = useState({ x: 0, y: -1 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const cellSize = 20;
    const canvasSize = 600;
    const edgeBuffer = 2; 

    const randomPosition = () => ({
        x: Math.floor(Math.random() * (canvasSize / cellSize - edgeBuffer * 2)) + edgeBuffer,
        y: Math.floor(Math.random() * (canvasSize / cellSize - edgeBuffer * 2)) + edgeBuffer,
    });

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = {
            x: newSnake[0].x + nextDirection.x,
            y: newSnake[0].y + nextDirection.y,
        };

        setDirection(nextDirection);

        if (
            head.x < 0 || head.y < 0 ||
            head.x >= canvasSize / cellSize || head.y >= canvasSize / cellSize ||
            newSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            setGameOver(true);
            return;
        }

        newSnake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            setScore(score + 1);
            setFood(randomPosition());
        } else {
            newSnake.pop();
        }
        setSnake(newSnake);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(moveSnake, 200);
            return () => clearInterval(interval);
        }
    }, [snake, direction, nextDirection, gameOver]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#2cc049';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        ctx.fillStyle = 'black';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
        });

        ctx.fillStyle = 'black';
        ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText(`Game Over | Money earned $${score * 5}`, canvasSize / 4, canvasSize / 2);
        }
    }, [snake, food, gameOver]);

    return (
        <div id="SnakeGame">
            <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
            <p>Score: {score}</p>
        </div>
    );
};

export default SnakeGame;