import axios from 'axios'

/**
 * Confugiracion de axios y ruta de conexion al backend, mediante uso de credenciales de acceso,
 */
const instance = axios.create({
    baseURL: 'https://unikasas-frontend.onrender.com/api',
    withCredentials: true
})

export default instance