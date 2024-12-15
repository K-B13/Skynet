import { useState } from "react";

const Tile = ({ num,  handleTileClick, winner }) => {
    const [ tileContent, setTileContent ] = useState('')
    const [ beenClicked, setBeenClicked ] = useState(false)

    return (
        <button
        value={num}
        disabled={beenClicked || winner}
        onClick={(e) => {
            handleTileClick(e, setTileContent, setBeenClicked)
        }}
        >
            {
            tileContent &&
            <img src={tileContent} width='20rem' height='20rem'/>
            }
        </button>
    )
}

export default Tile