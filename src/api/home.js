import axios from './axios'

// Rutas de conexion a metodos para home
export const getContactme = (data) => axios.post('/contactme', data) // Contactanos

export const getquote = (data) => axios.post('/quote', data) // Cotizacion

// export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)

// export const createTaskRequest = (task) => axios.post('/tasks', task)

// export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)

// export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)