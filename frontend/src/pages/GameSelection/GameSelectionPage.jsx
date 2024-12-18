import { useNavigate, useLocation } from "react-router-dom";
import './GameSelection.css'
import NavBar from "../NavBar/NavBar";

export function GameSelection() {
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';
    
    return (
    <div id="game-selection-page">
        <NavBar robotId={robotId}/>
        <div id="games-to-select">
        <h1>Welcome to the mini games page</h1>
        <img
            src="./bwmSelect.png"
            onClick={() => {navigate('/bwam', {
                state: {
                    robotId: robotId
                }
            })}}
            />
            <img
            src="./nutsBoltzSelect.png"
            onClick={() => {navigate('/nab', {
                state: {
                    robotId: robotId
                }
            })}}
            />

            <img
            src="./boltCatcherSelect.png"
            onClick={() => {navigate('/boltgame', {
                state: {
                    robotId: robotId
                }
            })}}
            />


            <img
            src="./virusSweeperSelect.png"
            onClick={() => {navigate('/virussweeper', {
                state: {
                    robotId: robotId
                }
            })}}
            />

            <img
            src="./triviaSelection.png"
            onClick={() => {navigate('/triviagame', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        <img
            src="./snakeSelection.png"
            onClick={() => {navigate('/snakegame', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        </div>
    </div>
    );
}