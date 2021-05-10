export const checkName = (input) => input.length > 0
export const checkEmail = (input) => input.length > 0

export const checkPassword = (input) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return input.match(regex)
}

