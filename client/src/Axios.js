import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 20000
})

export const signup = (body) => {
    return instance.post('/auth/signup', body)
}

export const requestPasswordReset = (body) => {
    return instance.post('/auth/requestResetPassword', body)
}

export const resetPassword = (body) => {
    return instance.post('/auth/resetPassword', body)
}

export const checkCode = (body) => {
    return instance.post('/auth/code', body)
}