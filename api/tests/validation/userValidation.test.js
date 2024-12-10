const { 
    passwordLength, 
    passwordSpecialCharacter, 
    passwordIncludesUpperCase, 
    passwordIncludesLowerCase, 
    passwordIsString, 
    passwordNoTrailingSpaces 
} = require('../../validation/userValidation')

describe('User Validation', () => {
    describe('password length', () => {
        it('password of length 9 should pass', async () => {
            const password = passwordLength('something')
            expect(password).toEqual(true)
        })
        it('password of length 8 should pass', async () => {
            const password = passwordLength('dramatic')
            expect(password).toEqual(true)
        })
        it('password of length 7 should fail', async () => {
            const password = passwordLength('finally')
            expect(password).toEqual(false)
        })
    })
})