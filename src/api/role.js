import axios from './axios'

// Rutas de conexion a metodos para roles
export const getRolesRequest = () => axios.get("/roles")

export const getRolesFilterRequest = (query) => axios.get(`/roles?query=${query}`)

export const getRoleRequest = (id) => axios.get(`/roles/${id}`)

export const createRoleRequest = (role) => axios.post('/roles', role)

export const updateRoleRequest = (id, role) => axios.put(`/roles/${id}`, role)

export const deleteRoleRequest = (id) => axios.delete(`/roles/${id}`)

export const reportRolesRequest = (data) => axios.post('/reports-roles', data, { responseType: 'blob' })