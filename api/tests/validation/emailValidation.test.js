const { emailFormat, allEmailChecks } = require('../../validation/emailValidation')

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

    describe('test all email checks', () => {
        it('test with a valid email', () => {
            const emailResponse = allEmailChecks('example@outlook.com')
            expect(emailResponse).toEqual([])
        })

        it('test with invalid email', () => {
            const emailResponse = allEmailChecks('exampleoutlook.com')
            expect(emailResponse).toEqual(['Email must be in the correct format'])
        })

        it('test with no email or undefined', () => {
            const emailResponse = allEmailChecks(undefined)
            expect(emailResponse).toEqual(['Invalid email type'])
        })

        it('test email with local part of 64 characters (allowed)', () => {
            const emailResponse = allEmailChecks(`${"a".repeat(64)}@gmail.com`)
            expect(emailResponse).toEqual([])
        })

        it('test email with local part of 65 characters (not allowed)', () => {
            const emailResponse = allEmailChecks(`${"a".repeat(65)}@gmail.com`)
            expect(emailResponse).toEqual(['Local part of email cannot exceed 64 characters'])
        })

        it('test email of 255 characters (allowed)', () => {
            const emailResponse = allEmailChecks(`${"a".repeat(64)}@${"a".repeat(64)}.${"a".repeat(64)}.${"a".repeat(56)}.com`)
            expect(emailResponse).toEqual([])
        })

        it('test email of 256 characters (not allowed)', () => {
            const emailResponse = allEmailChecks(`${"a".repeat(64)}@${"a".repeat(64)}.${"a".repeat(64)}.${"a".repeat(57)}.com`)
            expect(emailResponse).toEqual(['Email cannot exceed 255 characters'])
        })

        it('test email with incorrect format, too long local part and too long overall length', () => {
            const emailResponse = allEmailChecks(`${"a".repeat(65)}@@${"a".repeat(64)}.${"a".repeat(64)}.${"a".repeat(57)}.com`)
            expect(emailResponse).toEqual(['Email must be in the correct format', 'Local part of email cannot exceed 64 characters', 'Email cannot exceed 255 characters'])
        })
    })
})