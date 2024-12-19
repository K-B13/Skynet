import { useEffect, useRef } from 'react';
import { createGame } from './phaser/boltmain'; 
import {useNavigate} from 'react-router-dom'
import {updateRobotCurrency} from '../../services/robot'

const RobotBoltGame = ({robotId}) => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    
    useEffect(() => {
        const handleGameOver = async (finalScore) => {
            
            const response = await updateRobotCurrency(robotId, finalScore * 10);
            console.log(response);
            if(response.message === "robot currency updated"){
                setTimeout(() => {
                    navigate('/gameselection', {state: {robotId: robotId}});
                }, 3000); 
            }
        };

        const createdGame = createGame('game-container', handleGameOver);

        if (audioRef.current) {
            audioRef.current.play();
        }

        return () => {
            createdGame.destroy(true);

            
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [robotId, navigate]);

    return (
        <>
        <div id="game-container"></div>
        <audio ref={audioRef} loop>
                <source src="/boltgamemusic.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
        </audio>
        </>
    );
    };

export default RobotBoltGame;
