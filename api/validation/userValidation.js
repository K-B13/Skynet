const passwordLength = (password) => {
    return password.length >= 8
}

const passwordSpecialCharacter = (password) => {

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
    passwordIncludesUpperCase: passwordIncludesUpperCase,
    passwordIncludesLowerCase: passwordIncludesLowerCase,
    passwordIsString: passwordIsString,
    passwordNoTrailingSpaces: passwordNoTrailingSpaces
}

module.exports = userValidation