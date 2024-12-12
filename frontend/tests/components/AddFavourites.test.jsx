// render - renders the React component into a virtual DOM for testing. Simulates the mounting without render in a browser
// screen - Lets you query the rendered virtual DOM in a way that is similar to how a user would interact with the app
// fireEvent - helper to simulate user interactions, like typing in inputs or clicking buttons
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import AddFavourites from '../../src/components/CreateRobot/addFavourites'

describe( 'AddFavourites', () => {
    // we mock the functions that are passed down as props to make sure they are called and with the right arguments
    // The functionality of these functions will be tested in the component they are declared and is not pertinent now.
    const mockChangeInput = vi.fn();
    const mockOnChangeFunction = vi.fn();
    const mockOnClickFunction = vi.fn();

    const setup = (input = [], descriptor = 'like', placeholder = 'Like') => {
        render(
            <AddFavourites
                input={input}
                changeInput={mockChangeInput}
                descriptor={descriptor}
                placeholder={placeholder}
                onChangeFunction={mockOnChangeFunction}
                onClickFunction={mockOnClickFunction}
            />
        );
    };

    test('no like-inputs are present initially', () => {
        setup(); 
        expect(screen.getByText('Add a Like (Max 5)')).toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('renders AddFavourites with no likes', () => {
        setup()
        expect(screen.getByText('Add a Like (Max 5)')).toBeInTheDocument();
    })

    test('renders input fields for each like', () => {
        const likes = ['like1', 'like2']
        setup(likes)
        const inputs = screen.getAllByRole('textbox')
        expect(inputs).toHaveLength(likes.length)

        inputs.forEach((input, index) => {
            expect(input).toHaveValue(likes[index]);
        });
    })

    test('renders the placeholder text correctly with like', () => {
        const likes = ['like1', 'like2']
        setup(likes)
        const inputOne = screen.getByLabelText('Like 1')
        const inputTwo = screen.getByLabelText('Like 2')
        expect(inputOne).toBeInTheDocument()
        expect(inputTwo).toBeInTheDocument()
    })

    test('renders the placeholder text correctly with dislike', () => {
        const dislikes = ['dislike1', 'dislike2']
        setup(dislikes, 'dislike', 'Dislike')
        const inputOne = screen.getByLabelText('Dislike 1')
        const inputTwo = screen.getByLabelText('Dislike 2')
        expect(inputOne).toBeInTheDocument()
        expect(inputTwo).toBeInTheDocument()
    })

    test('renders input fields for each like including empty strings', () => {
        const likes = ['like1', '', '', 'like2']
        setup(likes)
        const inputs = screen.getAllByRole('textbox')
        expect(inputs).toHaveLength(likes.length)

        inputs.forEach((input, index) => {
            expect(input).toHaveValue(likes[index]);
        });
    })

    // This test is supposed to test the onChangeFunction is called and is called with the right props
    test('calls onChangeFunction when typing in an input', () => {
        const likes = ['like1']
        setup(likes)
        const inputs = screen.getAllByRole('textbox')
        fireEvent.change(inputs[0], { target: { value: 'new like' } }) // This should simulate typing I think it seems to work
        expect(mockOnChangeFunction).toHaveBeenCalledWith(
            expect.anything(), // The e object
            0, // Index of the input field
            likes, // Current input array
            mockChangeInput, // The onChange function
            'likes' // the descriptor
        )
    })

    test('calls onClickFunction when clicking the add button', () => {
        const likes = [];
        setup(likes);

        const button = screen.getByText('Add a Like (Max 5)')
        fireEvent.click(button)

        expect(mockOnClickFunction).toHaveBeenCalledWith(
            likes,
            mockChangeInput,
            'likes'
        )
    })

    test('renders the correct button text based on input length', () => {
        setup(['like1']); 
        expect(screen.getByText('Add Another Like (Max 5)')).toBeInTheDocument();
    });

    test('add more likes button disapears when likes reach 5', () => {
        setup(['like1', 'like2', 'like3', 'like4', 'like5']); 
        expect(screen.queryByText('Add Another Like (Max 5)')).not.toBeInTheDocument();

    });
})