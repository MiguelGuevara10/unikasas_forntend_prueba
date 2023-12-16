import axios from 'axios'

// Confugiracion de axios y ruta de conexion al backend, mediante uso de credenciales de acceso
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})

export default instance