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
        <div>
            <button
            onClick = {() => handleNewPick('Battery')}
            ><img src={relatedPic['Battery']} width='60rem' height='60rem'/></button>
            <button
            onClick = {() => handleNewPick('Wires')}
            ><img src={relatedPic['Wires']} width='60rem' height='60rem'/></button>
            <button
            onClick = {() => handleNewPick('Motherboard')}
            ><img src={relatedPic['Motherboard']} width='60rem' height='60rem'/></button>
        </div>
    )
}

export default BWAMChoice