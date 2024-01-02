import axios from './axios'

// Rutas de conexion a metodos para etapas de protectos
export const getStagesRequest = (idProject) => axios.get(`/stages?id_project=${idProject}`)

export const getStagesFilterRequest = (query, id) => axios.get(`/stages?query=${query}&id_project=${id}`)

export const getStageRequest = (id) => axios.get(`/stages/${id}`)

export const createStageRequest = (stage) => axios.post('/stages', stage)

export const updateStageRequest = (id, stage) => axios.put(`/stages/${id}`, stage)

export const deleteStageRequest = (id) => axios.delete(`/stages/${id}`)

// export const reportStagesRequest = (data) => axios.post('/reports-stages', data, { responseType: 'blob' })