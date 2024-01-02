import axios from './axios'

// Rutas de conexion a metodos para productos
export const getProductsRequest = () => axios.get('/products')

export const getProductsFilterRequest = (query) => axios.get(`/products?query=${query}`)

export const getProductsFilterCatalogueRequest = (query) => axios.get(`/?query=${query}`)

export const getProductRequest = (id) => axios.get(`/products/${id}`)

export const getProductsRequestCatalogue = () => axios.get('/')

export const createProductRequest = (product) => axios.post('/products', product)

export const updateProductRequest = (id, product) => axios.put(`/products/${id}`, product)

export const deleteProductRequest = (id) => axios.delete(`/products/${id}`)

export const reportProductRequest = (data) => axios.post('/reports-products', data, { responseType: 'blob' })