import { useState, useEffect, useRef } from 'react';
import "./SnakeGame.css";
import {useNavigate} from 'react-router-dom'
import { updateRobotCurrency } from '../../services/robot';

const SnakeGame = ({robotId}) => {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]); 
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: -1 });
    const [nextDirection, setNextDirection] = useState({ x: 0, y: -1 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();


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
            const interval = setInterval(moveSnake, 150);
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
        ctx.beginPath();
        ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2, 0, Math.PI * 2);
        ctx.fill();
        

        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            const text = `Game Over | Money earned $${score * 5}`;
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, (canvasSize - textWidth) / 2, canvasSize / 2);
            addCash()
        }
    }, [snake, food, gameOver]);

    const addCash = async () =>{
        const money = score * 5
        const response = await updateRobotCurrency(robotId, money);
            if(response.message === "robot currency updated"){
                setTimeout(() => {
                    navigate('/gameselection', {state: {robotId: robotId}});
                }, 3000); 
            }
    }

    return (
        <div id="nokia-phone">
        <div id="snake-contianer">
        <div id="SnakeScreen">
            <canvas ref={canvasRef} width={canvasSize} height={canvasSize}></canvas>
            <p id="snake-game-score">Score: {score}</p>
        </div>

        </div>
        </div>
    );
};

export default SnakeGame;