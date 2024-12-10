const passwordLength = (password) => {
    if (password.length >= 8) return { passes: true }
    return { passes: false, message: 'password is too short' }
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

}

const passwordIncludesLowerCase = (password) => {
    
}

const passwordIsString = (password) => {

}

const passwordNoTrailingSpaces = (password) => {

}

const userValidation = {
    passwordLength: passwordLength,
    passwordSpecialCharacter: passwordSpecialCharacter,
    passwordHasAnInteger: passwordHasAnInteger,
    passwordIncludesUpperCase: passwordIncludesUpperCase,
    passwordIncludesLowerCase: passwordIncludesLowerCase,
    passwordIsString: passwordIsString,
    passwordNoTrailingSpaces: passwordNoTrailingSpaces
}

module.exports = userValidation