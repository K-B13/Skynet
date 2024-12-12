import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import PersonalityBtns from '../../src/components/CreateRobot/PersonalityBtns'

describe('Personality Buttons', () => {
    let formDetails={personality: 'Helpful'}

    const mockHandleChanges = vi.fn()

    const setup = (personality='Helpful') => {
        render(
            <PersonalityBtns 
            personality={personality}
            formDetails={formDetails}
            handleChanges={mockHandleChanges}
            />
        )
    }

    test('testing the button appears on the page', () => {
        setup()
        const button = screen.getByText('Helpful')
        expect(button).toBeInTheDocument()
    })

    test('testing the handleChanges function is called on click', () => {
        setup()
        const button = screen.getByText('Helpful')
        fireEvent.click(button)
        expect(mockHandleChanges).toHaveBeenCalled()
    })

    test('button displays the correct text content', () => {
        setup('Wise');
        const button = screen.getByText('Wise');
        expect(button).toBeInTheDocument();
    });

    test('button initially has the correct class based on formDetails', () => {
        formDetails.personality = 'Helpful'
        setup('Wise');
        const button = screen.getByText('Wise');
        expect(button).toHaveClass('personality-btns not-selected-btn');
    });

    test('button is selected when it matches formDetails personality', () => {
        setup('Helpful');
        const button = screen.getByText('Helpful');
        expect(button).toHaveClass('personality-btns selected-btn');
    });

    test('button does not change class when personality is already selected', () => {
        formDetails.personality = 'Helpful'; 
        setup('Helpful');
        
        const button = screen.getByText('Helpful');
        fireEvent.click(button); 

        expect(button).toHaveClass('personality-btns selected-btn');
    });

    test('renders multiple buttons correctly', () => {
        const personalities = ['Helpful', 'Wise', 'Fiery'];
        personalities.forEach(personality => {
            setup(personality);
            const button = screen.getByText(personality);
            expect(button).toBeInTheDocument();
        });
    });
})