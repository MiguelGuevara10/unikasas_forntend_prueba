import axios from './axios'

// Rutas de conexion a metodos para proyectos
export const getProjectsRequest = () => axios.get("/projects")

export const getProjectFilterRequest = (query) => axios.get(`/projects?query=${query}`)

export const getProjectRequest = (id) => axios.get(`/projects/${id}`)

export const createProjectRequest = (uesr) => axios.post('/projects', uesr)

export const updateProjectRequest = (id, project) => axios.put(`/projects/${id}`, project)

export const deleteProjectRequest = (id) => axios.delete(`/projects/${id}`)

export const reportProjectRequest = (data) => axios.post('/reports-projects', data, { responseType: 'blob' })