const BWAMScoreboard = ({ scoreboard }) => {
    return (
        <div id='BWAM-scoreboard-container'>
            <div id='BWAM-scoreboard-heading'>
                <p id='BWAM-scoreboard-title'>Scoreboard:</p>
            </div>
            <div id='BWAM-scoreboard'>
                <p id='BWAM-scoreboard-games'>Games: {scoreboard.games}</p>
                <p id='BWAM-scoreboard-user'>User Score: {scoreboard.userScore}</p>
                <p id='BWAM-scoreboard-robot'>Robot Score: {scoreboard.robotScore}</p>
            </div>
        </div>
    )
}

export default BWAMScoreboard