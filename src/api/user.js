import axios from './axios'

// Rutas de conexion a metodos para usuarios
export const getUsersRequest = () => axios.get("/users")

export const getUsersFilterRequest = (query) => axios.get(`/users?query=${query}`)

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const createUserRequest = (user) => axios.post('/users', user)

export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user)

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)

export const reportUserRequest = (data) => axios.post('/reports-users', data, { responseType: 'blob' })