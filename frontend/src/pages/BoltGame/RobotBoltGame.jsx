// src/components/PhaserGame.js
import { useEffect } from 'react';
import { createGame } from './phaser/boltmain'; 

const PhaserGame = () => {
    useEffect(() => {
    const game = createGame('game-container');

    return () => {
        game.destroy(true);
    };
    }, []);

    return (
    <div id="game-container"></div>
    );
    };

export default PhaserGame;
