import { useState, useEffect } from 'react';
import Cell from './VirusSweeperCell';
import './VirusSweeperBoard.css';
import {useNavigate} from 'react-router-dom'
import { updateRobotCurrency } from '../../services/robot';


const VirusSweeperBoard = ({ robotId, rows, cols, mineCount, mineImage }) => {
    const [board, setBoard] = useState([]);
    const [revealedCells, setRevealedCells] = useState(new Set());
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        initializeBoard();
    }, [rows, cols, mineCount]);

    const initializeBoard = () => {
        let newBoard = Array(rows)
            .fill(null)
            .map(() => Array(cols).fill({ value: 0, revealed: false }));
        let minesPlaced = 0;

        while (minesPlaced < mineCount) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (newBoard[row][col].value !== 'M') {
                newBoard[row][col] = { value: 'M', revealed: false };
                minesPlaced++;
            }
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (newBoard[row][col].value === 'M') continue;
                let mineCount = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const r = row + i;
                        const c = col + j;
                        if (r >= 0 && c >= 0 && r < rows && c < cols && newBoard[r][c].value === 'M') {
                            mineCount++;
                        }
                    }
                }
                newBoard[row][col].value = mineCount;
            }
        }
        setBoard(newBoard);
    };


    const handleClick = async (row, col) => {
        if (gameOver || revealedCells.has(`${row},${col}`)) return;
    
        const newBoard = [...board];
        const cell = newBoard[row][col];
    
        if (cell.value === 'M') {
            newBoard.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.value === 'M') cell.revealed = true;
                })
            );
            setBoard(newBoard);
    
            setTimeout(() => {
                setGameOver(true);
            }, 300);
    
            const response = await updateRobotCurrency(robotId, score * 5);
            if (response.message === "robot currency updated") {
                setTimeout(() => {
                    navigate('/gameselection', { state: { robotId: robotId } });
                }, 3000);
            }
            return;
        }
    
        revealCell(row, col);
    };

    const revealCell = (row, col) => {

        const newRevealedCells = new Set(revealedCells);
        const newBoard = [...board];
    
        if (newRevealedCells.has(`${row},${col}`)) return;
    
        newRevealedCells.add(`${row},${col}`);
        newBoard[row][col].revealed = true;
    
        const cell = newBoard[row][col];
    
        if (cell.value === 'M') {
            setRevealedCells(newRevealedCells);
            setBoard(newBoard);
            setGameOver(true);
            return;
        }

        if (cell.value !== 'M') {
            setScore(prevScore => prevScore + 1); 
            setRevealedCells(newRevealedCells);
            setBoard(newBoard);
            return;
        }
    
        if (cell.value !== 0) {

            setRevealedCells(newRevealedCells);
            setBoard(newBoard);
            return;
        }

        
        let stack = [[row, col]];
    
        while (stack.length > 0) {
            const [r, c] = stack.pop();
    
            if (newRevealedCells.has(`${r},${c}`)) continue;
    
            newRevealedCells.add(`${r},${c}`);
            newBoard[r][c].revealed = true;
    
            if (newBoard[r][c].value === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = r + i;
                        const newCol = c + j;
    

                        if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols && !(i === 0 && j === 0)) {
                            if (!newRevealedCells.has(`${newRow},${newCol}`) && newBoard[newRow][newCol].value !== 'M') {
                                stack.push([newRow, newCol]);
                            }
                        }
                    }
                }
            }
        }
    
        setRevealedCells(newRevealedCells);
        setBoard(newBoard);
    };
    
    

    return (
        <>
        <div className="score">
            <h2 id="virus-sweeper-score">Score: {score}</h2>
        </div>
        <div className="board">
            {board.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => {
                            return (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    value={cell.value}
                                    revealed={cell.revealed}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                    mineImage={mineImage}
                                />
                            );
                        })}
                    </div>
                );
            })}
            {gameOver && (
                <div className="game-over-message">
                    <h2>Game Over</h2>
                    <p>Final Score: {score}</p>
                    <p>Money earned: {score * 5}</p>
                </div>
            )}
        </div>
    </>
    );
};

export default VirusSweeperBoard;
