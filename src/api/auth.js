import axios from './axios'

// Rutas de conexion para metodos de sesiones de usuario
export const registerRequest = user => axios.post('/register', user)

export const loginRequest = user => axios.post('/login', user)

export const verifyTokenRequest = () => axios.get('/verify')

export const logautRequest = () => axios.get('/logout')

export const recoverAccountRequest = (data) => axios.post('/recover-account', data)