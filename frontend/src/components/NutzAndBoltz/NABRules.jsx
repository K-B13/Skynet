import { IoCloseSharp } from "react-icons/io5";

const NABRules = ({ setViewInstruction }) => {
    return (
        <div id='NAB-rules-page'>
            <div id='NAB-rules'>
                <div id='NAB-rules-close-container'>             
                    <IoCloseSharp
                        id='NAB-rules-close'
                        onClick={() => setViewInstruction(false)}
                    />
                </div>
                <div id='rules-content-container'>
                    <div id='rules-content-header-container'>
                        <h4 id='rules-content-header'>Rules</h4>
                    </div>
                    <p id='rules-content-objective'>Objective: Be the first to align three of your symbols (horizontally, vertically, or diagonally) to win.</p>
                    <p id='rules-content-game-start'>Game Start: The player begins the game.</p>
                    <p  id='rules-content-robot-turn'>Robot Turn: The Robot will automatically make its move after you complete yours.</p>
                    <p id='rules-content-valid-moves'>Valid Moves: Only empty squares can be selected.</p>
                    <p id='rules-content-winning'>Winning: If either the player or Robot aligns three symbols, the game ends with a winner.</p>
                    <p id='rules-content-draw'>Draw: If all squares are filled without a winner, the game is a tie.</p>
                </div>
            </div>
        </div>
    )
}

export default NABRules