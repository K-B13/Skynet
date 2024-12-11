const passwordMinLength = (password) => {
    if (password.length >= 8) return { passes: true }
    return { passes: false, message: 'password is too short' }
}

const passwordMaxLength = (password) => {
    if (password.length <= 20) return { passes: true }
    return { passes: false, message: 'password is too long' }
}

const passwordSpecialCharacter = (password) => {
    const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
    if (specialCharacterRegex.test(password)) return { passes: true }
    return { passes: false, message: 'password does not have special character' }
}

const passwordHasAnInteger = (password) => {
    const integerRegex = /\d/;
    if (integerRegex.test(password)) return { passes: true }
    return { passes: false, message: 'password does not have an integer' }
}

const passwordIncludesUpperCase = (password) => {
    const uppercaseRegex = /[A-Z]/
    if (uppercaseRegex.test(password)) return { passes: true }
    return { passes: false, message: 'password does not have an upper case letter' }
}

const passwordIncludesLowerCase = (password) => {
    const lowercaseRegex = /[a-z]/
    if (lowercaseRegex.test(password)) return { passes: true }
    return { passes: false, message: 'password does not have a lower case letter' }
}

const passwordIsString = (password) => {
    if (typeof password === 'string') return { passes: true }
    return { passes: false, message: 'password must be a string' }
}

const passwordNoTrailingSpaces = (password) => {
    if (password[0] === ' ' || password[password.length - 1] === ' ') return { passes: false, message: 'password must not have spaces on either end of the password' }
    return { passes: true }
}

const allPasswordChecks = (password) => {
    let errorMessages = []
    if (!password) {
        errorMessages.push('Invalid password type')
        return errorMessages
    }
    let result = passwordMinLength(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordMaxLength(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordIncludesUpperCase(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordIncludesLowerCase(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordSpecialCharacter(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordHasAnInteger(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordIsString(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = passwordNoTrailingSpaces(password)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    return errorMessages
}

const passwordValidation = {
    passwordMinLength: passwordMinLength,
    passwordMaxLength: passwordMaxLength,
    passwordSpecialCharacter: passwordSpecialCharacter,
    passwordHasAnInteger: passwordHasAnInteger,
    passwordIncludesUpperCase: passwordIncludesUpperCase,
    passwordIncludesLowerCase: passwordIncludesLowerCase,
    passwordIsString: passwordIsString,
    passwordNoTrailingSpaces: passwordNoTrailingSpaces,
    allPasswordChecks: allPasswordChecks
}

module.exports = passwordValidation