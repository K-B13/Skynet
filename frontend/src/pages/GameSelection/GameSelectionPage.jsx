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
        <h1>Welcome to the mini games page</h1>
        <div id="games-to-select">
        <div id="bwm-container">
        <img
        className="image"
            src="./bwmSelect.png"
            onClick={() => {navigate('/bwam', {
                state: {
                    robotId: robotId
                }
            })}}
            />
        <img
        className="gif"
            src="./bwmSelectVid.gif"
            onClick={() => {navigate('/bwam', {
                state: {
                    robotId: robotId
                }
            })}}
            />
        </div>
        <div id="nuts-container">
        <img
        className="image"
        src="./nutsBoltzSelect.png"
        onClick={() => {navigate('/nab', {
            state: {
                robotId: robotId
            }
        })}}
        />
        <img
        className="gif"
        src="./nutsBoltsSelectVid.gif"
        onClick={() => {navigate('/nab', {
            state: {
                robotId: robotId
            }
        })}}
        />
        </div>
        <div id="bolt-container">
            <img
            className="image"
            src="./boltCatcherSelect.png"
            onClick={() => {navigate('/boltgame', {
                state: {
                    robotId: robotId
                }
            })}}
            />
            <img
            className="gif"
            src="./boltCatcherSelectVid.gif"
            onClick={() => {navigate('/boltgame', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        </div>

        <div id="virus-container">
            <img
            className="image"
            src="./virusSweeperSelect.png"
            onClick={() => {navigate('/virussweeper', {
                state: {
                    robotId: robotId
                }
            })}}
            />
            <img
            className="gif"
            src="./virusSweeperSelectVid.gif"
            onClick={() => {navigate('/virussweeper', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        </div>

        <div id="trivia-container">
            <img
            className="image"
            src="./triviaSelection.png"
            onClick={() => {navigate('/triviagame', {
                state: {
                    robotId: robotId
                }
            })}}
            />
            <img
            className="gif"
            src="./triviaSelectionVid.gif"
            onClick={() => {navigate('/triviagame', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        </div>
        
        <div id="snake-preview-container">
        <img
            className="image"
            src="./snakeSelection.png"
            onClick={() => {navigate('/snakegame', {
                state: {
                    robotId: robotId
                }
            })}}
            />
            <img
            className="gif"
            src="./snakeSelectionVid.gif"
            onClick={() => {navigate('/snakegame', {
                state: {
                    robotId: robotId
                }
            })}}
            />

        </div>
            <div id="blackjack-container">
            <img
            className="image"
            src="./blackjackSelect.png"
            onClick={() => {navigate('/blackjack', {
                state: {
                    robotId: robotId
                }
            })}}
            />

            <img
            className="gif"
            src="./blackjackSelectVid.gif"
            onClick={() => {navigate('/blackjack', {
                state: {
                    robotId: robotId
                }
            })}}
            />

            </div>

        </div>
    </div>
    );
}