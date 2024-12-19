const Criteria = ({passwordErrors, emailErrors }) => {
    const errorMapping = {
        "Password is too short": "Password is at least 8 characters long",
        "Password is too long": "Password is not longer than 20 characters long",
        "Password does not have special character": "Password must contain a special character",
        "Password does not have a number": "Password must contain a number",
        "Password does not have an upper case letter": "Password must contain an uppercase letter",
        "Password does not have a lower case letter": "Password must contain a lowercase letter",
        "Password must be a string": "Password must be a string",
        "Password must not have spaces on either end of the password": "Password must not have spaces on either end",
        "Invalid password type": "Password must be a string",
    }

    const emailCriteria = [
        "Email must be in the correct format",
        'Local part of email cannot exceed 64 characters',
        "Email cannot exceed 255 characters",
    ]

    const passwordCriteria = [
        "Password is at least 8 characters long",
        "Password is not longer than 20 characters long",
        "Password must contain a special character",
        "Password must contain a number",
        "Password must contain an uppercase letter",
        "Password must contain a lowercase letter",
    ];

    const isHighlighted = (errorArray, criterion) => {
        return errorArray.some((error) => criterion.includes(errorMapping[error] || error));
    };

    return (
        <div id='criteria-component'>
            <div id='email-criteria-container'>
                <h5
                    id='email-criteria-heading'
                >Email Criteria:</h5>
                {
                    emailCriteria.map((criterion, index) => {
                        return (
                            <p 
                                key={index}
                                id={`email-criteria-${index}`}
                                className={isHighlighted(emailErrors, criterion) ? "highlight" : ""}
                            >
                                {criterion}
                            </p>
                        )
                    })
                }
            </div>
            <div id='password-criteria-container'>
                <h5
                    id='password-criteria-heading'
                >Password Criteria:</h5>
                {
                    passwordCriteria.map((criterion, index) => {
                        return (
                            <p
                                key={index}
                                id={`password-criteria-${index}`}
                                className={isHighlighted(passwordErrors, criterion) ? "highlight" : ""}
                            >
                                {criterion}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Criteria