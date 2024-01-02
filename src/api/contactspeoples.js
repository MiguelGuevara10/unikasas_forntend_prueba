import axios from './axios'

// Rutas de conexion a metodos para contactos de personas 
export const getContactsRequest = () => axios.get(`/contacts-peoples`)

export const getContactsFilterRequest = (query) => axios.get(`/contacts-peoples?query=${query}`)

// export const getActivityRequest = (id) => axios.get(`/activities/${id}`)

// export const createActivityRequest = (activity) => axios.post('/activities', activity)

// export const updateActivityRequest = (id, activity) => axios.put(`/activities/${id}`, activity)

// export const deleteActivityRequest = (id) => axios.delete(`/activities/${id}`)

export const reportContactsRequest = (data) => axios.post('/reports-contacts', data, { responseType: 'blob' })