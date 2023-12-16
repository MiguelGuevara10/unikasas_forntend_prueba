import axios from './axios'

// Rutas de conexion a metodos para cotizaciones
export const getQuotesRequest = () => axios.get("/quotes")

export const getQuoteFilterRequest = (query) => axios.get(`/quotes?query=${query}`)

export const getQuoteRequest = (id) => axios.get(`/quotes/${id}`)

export const createQuoteRequest = (quote) => axios.post('/quotes', quote)

export const updateQuoteRequest = (id, quote) => axios.put(`/quotes/${id}`, quote)

export const deleteQuoteRequest = (id) => axios.delete(`/quotes/${id}`)

// export const reportTaskRequest = (data) => axios.post('/reports', data, { responseType: 'blob' })