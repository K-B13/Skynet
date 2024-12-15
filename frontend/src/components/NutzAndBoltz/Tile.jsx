const Tile = ({ num, icon, handleTileClick, winner, disableUserClick }) => {

    return (
        <button
        value={num}
        disabled={winner || disableUserClick || icon}
        onClick={(e) => {
            handleTileClick(e)
        }}
        >
            {
            icon &&
            <img src={icon} width='20rem' height='20rem'/>
            }
        </button>
    )
}

export default Tile