import { useState } from 'react'

const CreateRobot = () => {
    const [ formDetails, setFormDetails ] = useState({
        name: '',
        personality:''
    })
    const [ likeInputs, setLikeInputs] = useState([])
    const [ dislikeInputs, setDislikeInputs] = useState([])

    const addLikeInputs = (e) => {
        e.preventDefault()
        if (likeInputs.length < 5) {
            const newLikes = [...likeInputs, '']
            setLikeInputs([...newLikes])
            setFormDetails({ ...formDetails, likes: [...newLikes]})
        }
    }

    const addDislikeInputs = (e) => {
        e.preventDefault()
        if (dislikeInputs.length < 5) {
            const newDislikes = [...dislikeInputs, '']
            setDislikeInputs([...newDislikes])
            setFormDetails({ ...formDetails, dislikes: [...newDislikes]})
        }
    }

    const handleChanges = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    const likeChanges = (e, position) => {
        const newLikes = [...likeInputs]
        newLikes[position] = e.target.value
        setLikeInputs([...newLikes])
        setFormDetails({ ...formDetails, likes: [...newLikes] })
    }

    const dislikeChanges = (e, position) => {
        const newDislikes = [...dislikeInputs]
        newDislikes[position] = e.target.value
        setDislikeInputs([...newDislikes])
        setFormDetails({ ...formDetails, dislikes: [...newDislikes] })
    }

    return (
        <div id='create-robot-page'>
            <h2 id='create-robot-heading'>Create Robot</h2>
            <input
            id='create-robot-name'
            placeholder='Name'
            name='name'
            value={formDetails.name}
            onChange={handleChanges}
            />
            <div id='create-robot-personality-btns'>
                <button 
                    id='create-robot-helpful' 
                    onClick={handleChanges} 
                    value='Helpful' 
                    name='personality'
                    >Helpful</button>
                <button 
                    id='create-robot-playful' 
                    onClick={handleChanges} 
                    value='Playful' 
                    name='personality'
                >Playful</button>
                <button 
                    id='create-robot-wise' 
                    onClick={handleChanges} 
                    value='Wise' 
                    name='personality'
                >Wise</button>
                <button 
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
                        onChange={(e) => likeChanges(e, index)}
                        />
                    })
                }
                {
                    likeInputs.length === 0 ? 
                    <button 
                        onClick={addLikeInputs}
                        id='create-robot-add-first-like'
                    >Add a Like (Max 5)</button> : 
                    <button 
                        onClick={addLikeInputs}
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
                        onChange={(e) => dislikeChanges(e, index)}
                        />
                    })
                }
                {
                    dislikeInputs.length === 0 ?
                    <button 
                        onClick={addDislikeInputs}
                        id='create-robot-add-first-dislike'
                    >Add a dislike (Max 5)</button> : 
                    <button 
                        onClick={addDislikeInputs}
                        id='create-robot-add-dislike' 
                    >Add Another dislike (Max 5)</button>
                }
            </div>
            <button
            id='create-robot-submit'
            onClick={() => console.log(formDetails)}
            >Submit</button>
        </div>
    )
}

export default CreateRobot