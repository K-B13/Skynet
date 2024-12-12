const PersonalityBtns = ({ personality, formDetails, handleChanges }) => {
    return (
        <button
            type='button' 
            id={`create-robot-${personality}`}
            className={`personality-btns ${formDetails.personality === personality ? 'selected-btn' : 'not-selected-btn'}`}
            onClick={handleChanges} 
            value={personality} 
            name='personality'
        >
            {personality}
        </button>
    )
}

export default PersonalityBtns