import './VirusSweeperCell.css';

const VirusSweeperCell = ({ value, revealed, onClick, onRightClick, mineImage }) => {

    return (
        <div
            className={`cell ${revealed ? 'revealed' : ''}`}
            onClick={onClick}
            onContextMenu={onRightClick}
        >
            {revealed ? (
                value === 'M' && mineImage ? (
                    <img src={mineImage} alt="Virus" className="mine-image" />
                ) : (
                    value !== 0 && <span>{value}</span>
                )
            ) : (
                <span className="hidden-cell"></span>
            )}
        </div>
    );
};

export default VirusSweeperCell;

