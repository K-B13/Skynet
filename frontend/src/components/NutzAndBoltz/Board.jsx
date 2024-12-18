import Tile from "./Tile";
import { useState, useEffect } from "react";
import washer from "/NAB/washer.png";
import screw from "/NAB/screw.png";

const Board = ({ winner, setWinner }) => {
    const [currentIcon, setCurrentIcon] = useState(screw);
    const [disableUserClick, setDisableUserClick] = useState(false);
    const [boardState, setBoardState] = useState(Array(9).fill(null));
    const [userInfo, setUserInfo] = useState({
        userMoves: [],
        userIcon: screw,
    });
    const [robotInfo, setRobotInfo] = useState({
        robotMoves: [],
        robotIcon: washer,
    });

    const winArray = [
        ["0", "1", "2"],
        ["0", "4", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["2", "4", "6"],
        ["3", "4", "5"],
        ["6", "7", "8"],
    ];

    const getAvailableTiles = () => {
        return boardState
            .map((value, index) => (value === null ? index.toString() : null))
            .filter((tile) => tile !== null);
    };

    const calculateWinner = (moves) => {
        return winArray.some((combo) => combo.every((tile) => moves.includes(tile)));
    };

    const handleTileClick = (e) => {
        const tile = e.target.value;

        if (winner || boardState[tile] !== null) return;

        // Update board state
        const updatedBoardState = [...boardState];
        updatedBoardState[parseInt(tile)] = currentIcon;
        setBoardState(updatedBoardState);

        // Update user moves
        const updatedUserMoves = [...userInfo.userMoves, tile];
        setUserInfo((prev) => ({
            ...prev,
            userMoves: updatedUserMoves,
        }));

        // Check for a win or draw
        if (calculateWinner(updatedUserMoves)) {
            setWinner("User");
            return;
        }

        if (updatedUserMoves.length + robotInfo.robotMoves.length === 9) {
            setWinner("Draw");
            return;
        }

        // Pass the turn to the robot
        setCurrentIcon(robotInfo.robotIcon);
        setDisableUserClick(true);
        };

    const robotMakeMove = () => {
        if (winner) return;

        const availableTiles = getAvailableTiles();

        // Try to win
        for (let tile of availableTiles) {
            const testMoves = [...robotInfo.robotMoves, tile];
            if (calculateWinner(testMoves)) {
                makeRobotMove(tile);
                setWinner("Robot");
                return;
            }
        }

        // Try to block user from winning
        for (let tile of availableTiles) {
            const testMoves = [...userInfo.userMoves, tile];
            if (calculateWinner(testMoves)) {
                makeRobotMove(tile);
                return;
            }
        }

    // Make a random move
    const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
    makeRobotMove(randomTile);
    };

    const makeRobotMove = (tile) => {
        const updatedBoardState = [...boardState];
        updatedBoardState[parseInt(tile)] = robotInfo.robotIcon;
        setBoardState(updatedBoardState);

        const updatedRobotMoves = [...robotInfo.robotMoves, tile];
        setRobotInfo((prev) => ({
            ...prev,
            robotMoves: updatedRobotMoves,
        }));

        if (calculateWinner(updatedRobotMoves)) {
            setWinner("Robot");
            return;
        }

        if (updatedRobotMoves.length + userInfo.userMoves.length === 9) {
            setWinner("Draw");
            return;
        }

        // Pass the turn back to the user
        setCurrentIcon(userInfo.userIcon);
        setDisableUserClick(false);
        };

    useEffect(() => {
        if (currentIcon === robotInfo.robotIcon && !winner) {
            const timeout = setTimeout(robotMakeMove, 500);
            return () => clearTimeout(timeout);
        }
        }, [currentIcon, winner]);

    return (
        <div id='NAB-board-container'>
            {!winner && (currentIcon === userInfo.userIcon ? <h4 id='NAB-users-turn'>Your Move!</h4>: <h4 id='NAB-robots-turn'>{"Robot's Move"}</h4>)}
            <div id='NAB-board'>
                <div id='NAB-board-top-row'>
                    <Tile num='0' icon={boardState[0]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='1' icon={boardState[1]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='2' icon={boardState[2]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                </div>
                <div id='NAB-board-middle-row'>
                    <Tile num='3' icon={boardState[3]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='4' icon={boardState[4]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='5' icon={boardState[5]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                </div>
                <div id='NAB-board-bottom-row'>
                    <Tile num='6' icon={boardState[6]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='7' icon={boardState[7]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                    <Tile num='8' icon={boardState[8]} handleTileClick={handleTileClick} winner={winner} disableUserClick={disableUserClick}/>
                </div>
            </div>
        </div>
    )
}

export default Board