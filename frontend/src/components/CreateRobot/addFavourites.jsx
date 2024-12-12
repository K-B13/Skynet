// import '../pages/CreateRobot/CreateRobot.css'

const AddFavourites = ( { input, changeInput, descriptor, placeholder, onChangeFunction, onClickFunction } ) => {
    return (
        <div id={`create-robot-all-${descriptor}s`}>
            {
                input.length > 0 &&
                input.map((like, index) => {
                    return (
                        <div key={index + 1}  className='like-container'>
                            <input
                                type='text'
                                className='like-input'
                                name={index} 
                                id={`create-robot-like-${index}`}
                                value={like}
                                onChange={(e) => onChangeFunction(e, index, input, changeInput, `${descriptor}s`)}
                            />
                            <label className='like-label' id={`${descriptor}-label-${index + 1}`}>{placeholder} {index + 1}</label>
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
                >Add a Like (Max 5)</button> : 
                <button
                    type='button'  
                    onClick={() => onClickFunction(input, changeInput, `${descriptor}s`)}
                    id={`create-robot-add-${descriptor}`}
                    className='add-like-btn'
                >Add Another Like (Max 5)</button>
            }
        </div>
    )
}

export default AddFavourites