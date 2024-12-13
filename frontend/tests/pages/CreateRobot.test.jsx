import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import CreateRobot from '../../src/pages/CreateRobot/CreateRobot'

describe('Create Robot', () => {
    test('renders the Create Robot page with form elements', () => {
        render(
            <MemoryRouter>
                <CreateRobot />
            </MemoryRouter>
        );
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByText('Helpful')).toBeInTheDocument();
        expect(screen.getByText('Playful')).toBeInTheDocument();
        expect(screen.getByText('Wise')).toBeInTheDocument();
        expect(screen.getByText('Fiery')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('updates the name field when user types in it', () => {
        render(
            <MemoryRouter>
                <CreateRobot />
            </MemoryRouter>
        );
        const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'Robo1' } });
        expect(nameInput.value).toBe('Robo1');
    });

    test('updates the personality when a personality button is clicked', () => {
        render(
            <MemoryRouter>
                <CreateRobot />
            </MemoryRouter>
        );
        const playfulButton = screen.getByText('Playful');
        const helpfulButton = screen.getByText('Helpful');
        expect(helpfulButton).toHaveClass('selected-btn');
        fireEvent.click(playfulButton);
        expect(playfulButton).toHaveClass('selected-btn');
        expect(helpfulButton).toHaveClass('not-selected-btn');
    });

    test('adds a new like input when the add button is clicked', async () => {
        render(
            <MemoryRouter>
                <CreateRobot />
            </MemoryRouter>
        );
        const addLikeButton = screen.getByText('Add a Like (Max 5)'); 
        fireEvent.click(addLikeButton);
        await waitFor(() => screen.getByLabelText('Like 1'))
        const newLikeInput = screen.getByLabelText('Like 1');
        expect(newLikeInput).toBeInTheDocument()
        const addSecondLikeButton = screen.getByText('Add Another Like (Max 5)'); 
        expect(addSecondLikeButton).toBeInTheDocument();
        const addFirstLikeButton = screen.queryByText('Add a Like (Max 5)');
        expect(addFirstLikeButton).not.toBeInTheDocument()
    });

    test('adds a new dislike input when the add button is clicked', async () => {
        render(
            <MemoryRouter>
                <CreateRobot />
            </MemoryRouter>
        );
        const addDislikeButton = screen.getByText('Add a Dislike (Max 5)'); 
        fireEvent.click(addDislikeButton);
        await waitFor(() => screen.getByLabelText('Dislike 1'))
        const newDislikeInput = screen.getByLabelText('Dislike 1');
        expect(newDislikeInput).toBeInTheDocument()
        const addSecondDislikeButton = screen.getByText('Add Another Dislike (Max 5)'); 
        expect(addSecondDislikeButton).toBeInTheDocument();
        const addFirstDislikeButton = screen.queryByText('Add a Dislike (Max 5)');
        expect(addFirstDislikeButton).not.toBeInTheDocument()
    });
})