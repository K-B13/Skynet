// import '../pages/CreateRobot/CreateRobot.css'

const AddFavourites = ( { input, changeInput, descriptor, placeholder, onChangeFunction, onClickFunction } ) => {
    return (
        <div id={`create-robot-all-${descriptor}s`}>
            {
                input.length > 0 &&
                input.map((like, index) => {
                    return (
                        <div key={index + 1}  className='like-container' id={`like-container-${index + 1}`}>
                            <input
                                type='text'
                                className='like-input'
                                maxLength='40'
                                name={index} 
                                id={`create-robot-${descriptor}-${index + 1}`}
                                value={like}
                                onChange={(e) => onChangeFunction(e, index, input, changeInput, `${descriptor}s`)}
                            />
                            <label  htmlFor={`create-robot-${descriptor}-${index + 1}`} className='like-label' id={`${descriptor}-label-${index + 1}`}>{placeholder} {index + 1}</label>
                            <div className='like-topline' id={`${descriptor}-topline-${index + 1}`}></div>
                            <div className='like-underline' id={`${descriptor}-underline-${index + 1}`}></div>
                    </div>
                    )
                })
            }
            {
                input.length === 0 ? 
                <button
                    type='button'  
                    onClick={() => onClickFunction(input, changeInput, `${descriptor}s`)}
                    id={`create-robot-add-first-${descriptor}`}
                    className='add-like-btn'
                >Add a {placeholder} (Max 5)</button> : 
                input.length !== 5 &&
                <button
                    type='button'  
                    onClick={() => onClickFunction(input, changeInput, `${descriptor}s`)}
                    id={`create-robot-add-${descriptor}`}
                    className={`add-like-btn`}
                    disabled= {input.length === 5 ? true: false}
                >Add Another {placeholder} (Max 5)</button>
            }
        </div>
    )
}

export default AddFavourites