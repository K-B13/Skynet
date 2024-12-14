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
            <button
                id='BWAM-choice-battery'
                onClick = {() => handleNewPick('Battery')}
            >
                <img 
                    src={relatedPic['Battery']} 
                    id='BWAM-choice-battery-pic'
                    width='100rem' 
                    height='100rem'
                />
            </button>

            <button
                id='BWAM-choice-wires'
                onClick = {() => handleNewPick('Wires')}
            >
                <img 
                    src={relatedPic['Wires']} 
                    id='BWAM-choice-wires-pic'
                    width='100rem' 
                    height='100rem'
                />
            </button>
            
            <button
                id='BWAM-choice-motherboard'
                onClick = {() => handleNewPick('Motherboard')}
            >
                <img 
                    src={relatedPic['Motherboard']} 
                    id='BWAM-choice-motherboard-pic'
                    width='100rem' 
                    height='100rem'
                />
            </button>
        </div>
    )
}

export default BWAMChoice