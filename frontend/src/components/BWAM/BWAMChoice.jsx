const BWAMChoice = ({ setCurrentChoice, relatedPic, selectedChoice, setSelectedChoice }) => {
    const handleNewPick = (choice) => {
        setCurrentChoice(choice)
            if (selectedChoice.userChoice !== '' && selectedChoice.robotChoice !== '') {
                setSelectedChoice({
                    userChoice: '',
                    robotChoice: ''
                })
        }
    }
    return (
        <div id='BWAM-choices-container'>
            <div id='BWAM-choice-battery-container'>
                <button
                    id='BWAM-choice-battery'
                    onClick = {() => handleNewPick('Battery')}
                >
                    <img 
                        src={relatedPic['Battery']} 
                        id='BWAM-choice-battery-pic'
                        width='90rem' 
                        height='90rem'
                    />
                </button>
                <p>Battery</p>
            </div>

            <div id='BWAM-choice-wires-container'>
                <button
                    id='BWAM-choice-wires'
                    onClick = {() => handleNewPick('Wires')}
                >
                    <img 
                        src={relatedPic['Wires']} 
                        id='BWAM-choice-wires-pic'
                        width='90rem' 
                        height='90rem'
                    />
                </button>
                <p>Wires</p>
            </div>
            <div id='BWAM-choice-motherboard-container'>
                <button
                    id='BWAM-choice-motherboard'
                    onClick = {() => handleNewPick('Motherboard')}
                >
                    <img 
                        src={relatedPic['Motherboard']} 
                        id='BWAM-choice-motherboard-pic'
                        width='90rem' 
                        height='90rem'
                    />
                </button>
                <p>Motherboard</p>
            </div>
        </div>
    )
}

export default BWAMChoice