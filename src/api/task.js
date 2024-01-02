import axios from './axios'

// Rutas de conexion a metodos para tareas
export const getTasksRequest = () => axios.get("/tasks")

export const getTasksFilterRequest = (query) => axios.get(`/tasks?query=${query}`)

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)

export const createTaskRequest = (task) => axios.post('/tasks', task)

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)

export const reportTaskRequest = (data) => axios.post('/reports-tasks', data, { responseType: 'blob' })