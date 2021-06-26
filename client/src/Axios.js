import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 20000
})

instance.interceptors.request.use(req => {
    const token = localStorage.getItem('token')
    req.headers['Authorization'] = 'Bearer ' + token
    return req
})

export const signin = (body) => {
    return instance.post('/auth/signin', body)
}

export const signup = (body) => {
    return instance.post('/auth/signup', body)
}

export const requestPasswordReset = (body) => {
    return instance.post('/auth/requestResetPassword', body)
}

export const resetPassword = (body) => {
    return instance.post('/auth/resetPassword', body)
}

export const checkResetPasswordCode = (body) => {
    return instance.post('/auth/code', body)
}

export const uploadPhoto = (body) => {
	return instance.post('/photo/upload', body)
}

export const getPhotoById = (id) => {
	return instance.get(`/photo/${id}`)
}

export const getAllPhotosFromUser = (userId) => {
	return instance.get(`/photo/all/${userId}`)
}