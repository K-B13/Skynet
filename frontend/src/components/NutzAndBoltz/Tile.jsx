const Tile = ({ num, icon, handleTileClick, winner, disableUserClick }) => {

    return (
        <button
        id={`NAB-button-${num}`}
        className="NAB-buttons"
        value={num}
        disabled={winner || disableUserClick || icon}
        onClick={(e) => {
            handleTileClick(e)
        }}
        >
            {
            icon &&
            <img id={`NAB-image-${num}`} src={icon} width='20rem' height='20rem'/>
            }
        </button>
    )
}

export default Tile