import { useEffect } from 'react';
import { createGame } from './phaser/boltmain'; 
import {useNavigate} from 'react-router-dom'
import {updateRobotCurrency} from '../../services/robot'

const RobotBoltGame = ({robotId}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleGameOver = async (finalScore) => {
            const response = await updateRobotCurrency(robotId, finalScore);
            if(response.message === "robot currency updated"){
                setTimeout(() => {
                    navigate('/landingpage');
                }, 3000); 
            }
        };

        const createdGame = createGame('game-container', handleGameOver);

    return () => {
        createdGame.destroy(true);
    };
    }, []);

    return (
        <div id="game-container"></div>
        
    );
    };

export default RobotBoltGame;
