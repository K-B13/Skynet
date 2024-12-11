const { emailFormat } = require('../../validation/emailValidation')

describe('Email Validation', () => {
    describe('email in the right format', () => {
        it('test with email in right form no numbers', () => {
            const email = emailFormat('example@outlook.com')
            expect(email.passes).toEqual(true)
        })

        it('test with email in right form with number', () => {
            const email = emailFormat('example2@outlook.com')
            expect(email.passes).toEqual(true)
        })

        it('test with email in right form with number and % sign', () => {
            const email = emailFormat('example2%@outlook.com')
            expect(email.passes).toEqual(true)
        })

        it('test with email without @ sign', () => {
            const email = emailFormat('example2%outlook.com')
            expect(email.passes).toEqual(false)
            expect(email.message).toEqual('Email must be in the correct format')
        })

        it('test with email without domain', () => {
            const email = emailFormat('example2%@.com')
            expect(email.passes).toEqual(false)
            expect(email.message).toEqual('Email must be in the correct format')
        })

        it('test with email without .', () => {
            const email = emailFormat('example2%@outlookcom')
            expect(email.passes).toEqual(false)
            expect(email.message).toEqual('Email must be in the correct format')
        })

        it('test with email without suffix', () => {
            const email = emailFormat('example2%@outlook.')
            expect(email.passes).toEqual(false)
            expect(email.message).toEqual('Email must be in the correct format')
        })
    })
})