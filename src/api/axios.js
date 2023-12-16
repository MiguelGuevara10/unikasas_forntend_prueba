import axios from 'axios'

// Confugiracion de axios y ruta de conexion al backend, mediante uso de credenciales de acceso
// const URL = "http://localhost:4000/api" // Url Desarrollo
const URL = "https://unikasas-backend-prueba-dev-qckm.3.us-1.fl0.io/api"
const instance = axios.create({
    baseURL: URL,
    withCredentials: true
})

export default instance