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

    describe('password includes upper case', () => {
        it('password has an uppercase letter', () => {
            const password = passwordIncludesUpperCase('Something1?')
            expect(password.passes).toEqual(true)
        })

        it('password does not have an uppercase letter', () => {
            const password = passwordIncludesUpperCase('finally')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password does not have an upper case letter')
        })
    })

    describe('password includes lower case', () => {
        it('password has a lowercase letter', () => {
            const password = passwordIncludesLowerCase('Something1?')
            expect(password.passes).toEqual(true)
        })

        it('password does not have a lowercase letter', () => {
            const password = passwordIncludesLowerCase('FINALLY')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password does not have a lower case letter')
        })
    })

    describe('password is a string function', () => {
        it('password is a string', () => {
            const password = passwordIsString('Something1?')
            expect(password.passes).toEqual(true)
        })

        it('password is not a string', () => {
            const password = passwordIsString(24)
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password must be a string')
        })
    })

    describe('password has no trailing or leading spaces function', () => {
        it('password has no leading or trailing spaces', () => {
            const password = passwordNoTrailingSpaces('Something1?')
            expect(password.passes).toEqual(true)
        })

        it('password has a trailing space', () => {
            const password = passwordNoTrailingSpaces('Something1? ')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password must not have spaces on either end of the password')
        })

        it('password has a leading space', () => {
            const password = passwordNoTrailingSpaces(' Something1?')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password must not have spaces on either end of the password')
        })

        it('password has a trailing and leading space', () => {
            const password = passwordNoTrailingSpaces(' Something1? ')
            expect(password.passes).toEqual(false)
            expect(password.message).toEqual('password must not have spaces on either end of the password')
        })
    })
})