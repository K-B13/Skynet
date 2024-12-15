import VirusSweeperBoard from './VirusSweeperBoard.jsx'; 
import './VirusSweeperPage.css';  

const VirusSweeperPage = () => {
const mineImage = '/assets/virus.png'; 

    return (
    <div id="minesweeper-page">
        <h1>Virus Sweeper</h1>
        <VirusSweeperBoard rows={10} cols={10} mineCount={20} mineImage={mineImage} />
    </div>
    );
};

export default VirusSweeperPage;
