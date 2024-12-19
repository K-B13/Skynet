import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../src/pages/Login/LoginPage';


describe('Sign Up Page', () => {
    test('renders the input on the page', async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        )

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    test('updates the email field when user types in it', async () => {
            render(
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            )
    
            const emailInput = screen.getByPlaceholderText('Email')
            fireEvent.change(emailInput, { target: { value: 'someone@gmail.com' } })
            expect(emailInput.value).toBe('someone@gmail.com')
        })

    test('updates the password field when user types in it', async () => {
            render(
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            )
    
            const passwordInput = screen.getByPlaceholderText('Password')
            fireEvent.change(passwordInput, { target: { value: 'Someone123!' } })
            expect(passwordInput.value).toBe('Someone123!')
        })
})