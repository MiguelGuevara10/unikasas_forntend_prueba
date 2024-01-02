import axios from './axios'

// Rutas de conexion a metodos para actividades de etapas
export const getActivitiesRequest = (idStage) => axios.get(`/activities?id_stage=${idStage}`)

export const getActivitiesFilterRequest = (query, id) => axios.get(`/activities?query=${query}&id_stage=${id}`)

export const getActivityRequest = (id) => axios.get(`/activities/${id}`)

export const createActivityRequest = (activity) => axios.post('/activities', activity)

export const updateActivityRequest = (id, activity) => axios.put(`/activities/${id}`, activity)

export const deleteActivityRequest = (id) => axios.delete(`/activities/${id}`)

// export const reportUserRequest = (data) => axios.post('/reports-users', data, { responseType: 'blob' })