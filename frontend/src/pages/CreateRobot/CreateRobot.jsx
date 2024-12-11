import { useState } from 'react'
import { getPayloadFromToken } from '../../helpfulFunctions/helpfulFunctions'

const CreateRobot = () => {
    const [ formDetails, setFormDetails ] = useState({
        name: '',
        personality: 'Helpful'
    })
    const [ likeInputs, setLikeInputs] = useState([])
    const [ dislikeInputs, setDislikeInputs] = useState([])

    
    const handleChanges = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }
    
    const addLikeDislikeInputs = (currentInput, changeInput, descriptor) => {
        if (currentInput.length < 5) {
            const newArray = [...currentInput, '']
            changeInput([...newArray])
            setFormDetails({ ...formDetails, [descriptor]: [...newArray]})
        }
    }
    const likeDislikeChanges = (e, position, currentInput, changeInput, descriptor) => {
        const newArray = [...currentInput]
        newArray[position] = e.target.value
        changeInput([...newArray])
        setFormDetails({ ...formDetails, [descriptor]: [...newArray] })
    }

    return (
        <div id='create-robot-page'>
            <h2 id='create-robot-heading'>Create Robot</h2>
            <form id='create-robot-form'>
            <input
            id='create-robot-name'
            placeholder='Name'
            name='name'
            value={formDetails.name}
            onChange={handleChanges}
            required
            />
            <div id='create-robot-personality-btns'>
                <button
                    type='button' 
                    id='create-robot-helpful' 
                    onClick={handleChanges} 
                    value='Helpful' 
                    name='personality'
                    >Helpful</button>
                <button
                    type='button'  
                    id='create-robot-playful' 
                    onClick={handleChanges} 
                    value='Playful' 
                    name='personality'
                >Playful</button>
                <button
                    type='button'  
                    id='create-robot-wise' 
                    onClick={handleChanges} 
                    value='Wise' 
                    name='personality'
                >Wise</button>
                <button
                    type='button'  
                    id='create-robot-fiery' 
                    onClick={handleChanges} 
                    value='Fiery' 
                    name='personality'
                    >Fiery</button>
            </div>
            <div id='create-robot-all-likes'>
                {
                    likeInputs.length > 0 &&
                    likeInputs.map((like, index) => {
                        return <input 
                        key={index + 1} 
                        placeholder="Like"
                        name={index} 
                        id={`create-robot-like-${index}`}
                        value={like}
                        onChange={(e) => likeDislikeChanges(e, index,likeInputs, setLikeInputs, 'likes')}
                        />
                    })
                }
                {
                    likeInputs.length === 0 ? 
                    <button
                        type='button'  
                        onClick={() => addLikeDislikeInputs(likeInputs, setLikeInputs, 'likes')}
                        id='create-robot-add-first-like'
                    >Add a Like (Max 5)</button> : 
                    <button
                        type='button'  
                        onClick={() => addLikeDislikeInputs(likeInputs, setLikeInputs, 'likes')}
                        id='create-robot-add-like'
                        >Add Another Like (Max 5)</button>
                }
            </div>
            <div id='create-robot-all-dislikes'>
                {
                    dislikeInputs.length > 0 &&
                    dislikeInputs.map((dislike, index) => {
                        return <input 
                        key={index + 1} 
                        placeholder="Dislike"
                        name={index}  
                        id={`create-robot-dislike-${index}`}
                        value={dislike}
                        onChange={(e) => likeDislikeChanges(e, index,dislikeInputs, setDislikeInputs, 'dislikes')}
                        />
                    })
                }
                {
                    dislikeInputs.length === 0 ?
                    <button
                        type='button'  
                        onClick={() => addLikeDislikeInputs(dislikeInputs, setDislikeInputs, 'dislikes')}
                        id='create-robot-add-first-dislike'
                    >Add a dislike (Max 5)</button> : 
                    <button
                        type='button' 
                        onClick={() => addLikeDislikeInputs(dislikeInputs, setDislikeInputs, 'dislikes')}
                        id='create-robot-add-dislike' 
                    >Add Another dislike (Max 5)</button>
                }
            </div>
            <button
                id='create-robot-submit'
                onClick={(e) => {
                    e.preventDefault()
                    console.log(formDetails)
                }}
            >Submit</button>
            </form>
        </div>
    )
}

export default CreateRobot