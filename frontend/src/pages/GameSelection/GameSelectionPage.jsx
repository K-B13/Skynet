import { useNavigate, useLocation } from "react-router-dom";



export function GameSelection() {
    const navigate = useNavigate()
    const location = useLocation()
    const { robotId } = location.state || '';
    
    return (
    <div id="game-selection-page">
        <div id="games-to-select">
        <h1>Welcome to the mini games page</h1>
        <button
            onClick={() => {navigate('/bwam', {
                state: {
                    robotId: robotId
                }
            })}}
            >BWAM</button>
            <button
            onClick={() => {navigate('/nab', {
                state: {
                    robotId: robotId
                }
            })}}
            >NAB</button>
            <button
            onClick={() => {navigate('/boltgame', {
                state: {
                    robotId: robotId
                }
            })}}
            >Bolt game</button>
            <button
            onClick={() => {navigate('/virussweeper', {
                state: {
                    robotId: robotId
                }
            })}}
            >Virus sweeper</button>
        </div>
    </div>
    );
}