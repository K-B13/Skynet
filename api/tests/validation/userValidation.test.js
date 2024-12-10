const { 
    passwordLength, 
    passwordSpecialCharacter,
    passwordHasAnInteger,
    passwordIncludesUpperCase, 
    passwordIncludesLowerCase, 
    passwordIsString, 
    passwordNoTrailingSpaces 
} = require('../../validation/userValidation')

describe('User Validation', () => {
    describe('password length', () => {
        it('password of length 9 should pass', () => {
            const password = passwordLength('something')
            expect(password.passes).toEqual(true)
        })

        it('password of length 8 should pass', () => {
            const password = passwordLength('dramatic')
            expect(password.passes).toEqual(true)
        })

        it('password of length 7 should fail', () => {
            const password = passwordLength('finally')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password is too short')
        })
    })

    describe('password special character', () => {
        it('password has special character', () => {
            const password = passwordSpecialCharacter('something?')
            expect(password.passes).toEqual(true)
        })

        it('password does not have special character', () => {
            const password = passwordSpecialCharacter('finally')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password does not have special character')
        })
    })

    describe('password has an integer', () => {
        it('password has an integer', () => {
            const password = passwordHasAnInteger('something1?')
            expect(password.passes).toEqual(true)
        })

        it('password does not have an integer', () => {
            const password = passwordHasAnInteger('finally')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password does not have an integer')
        })
    })
})