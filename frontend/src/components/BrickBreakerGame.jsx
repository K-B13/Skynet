import { useEffect } from 'react';
import Phaser from 'phaser';

const BrickBreakerGame = ({ config }) => {

    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        }
    }, [])
    return (
        <div id="brick-breaker"></div>
    )
}

export default BrickBreakerGame