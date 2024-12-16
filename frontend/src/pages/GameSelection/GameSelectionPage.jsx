import { useNavigate, useLocation } from "react-router-dom";


import './GameSelection.css'
export function GameSelection() {
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';
    
    return (
    <div id="game-selection-page">
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
        </div>
    </div>
    );
}