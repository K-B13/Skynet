const emailFormat = (email) => {
    // ^[a-zA-Z0-9._%+-] checks for alphanumeric characters or special characters at the start of the email
    // the +@ then checks for the @ making it required
    // [a-zA-Z0-9-]+ makes sure there must be one or more alphanumeric characters
    // \. checks for the .
    // [a-zA-Z]{2,}$ the domain suffix must be at least 2 letters long and consist of alphabetic characters
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(email)) return { passes: true }
    return { passes: false, message: 'Email must be in the correct format' }
}

const emailLocalLength = (email) => {
    const localPart = email.split("@")[0]
    if (localPart.length <= 64) return { passes: true }
    return { passes: false, message: 'Local part of email cannot exceed 64 characters' }
}

const emailLength = (email) => {
    if (email.length <= 255) return { passes: true }
    return { passes: false, message: 'Email cannot exceed 255 characters' }
}

const allEmailChecks = (email) => {
    errorMessages = []
    if (!email) {
        errorMessages.push('Invalid email type')
        return errorMessages
    }
    let result = emailFormat(email)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = emailLocalLength(email)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    result = emailLength(email)
    if (!result.passes) {
        errorMessages.push(result.message)
    }
    return errorMessages
}

const emailValidation = {
    emailFormat: emailFormat,
    allEmailChecks: allEmailChecks
}

module.exports = emailValidation