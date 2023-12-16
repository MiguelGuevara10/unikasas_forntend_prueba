import { createContext, useState, useContext, useEffect } from "react"
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth"
import Cookies from 'js-cookie'

// Creacion del contexto de usuario
export const AuthContex = createContext()

export const useAuth = () => {
    const context = useContext(AuthContex)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

// Creacion de provider de autenticación de usuarios
export const AuthProvider = ({ children }) => {

    // Definicion de variables de usuario
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true) // Validacion de carga de informacion

    // Regisro de usuario
    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)   
        } catch (error) {
            console.error(error.response.data)
            setErrors(error.response.data)
        }
    }

    // Login de unuario
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true) 
        } catch (error) {
            console.error(error)
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    // Cierre de cesion del usuario
    const logout = () => {
        try {
            Cookies.remove("token")
            setIsAuthenticated(false)
            setUser(null)
        } catch (error) {
            console.error(error)
        }
    }

    // Eliminacion de errores a diligenciar datos no validos en el formulario
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);  
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors])

    // Validacion de login de usuario
    useEffect(() => {
        async function checkLogin () {
            // Vaidar cookie token de usuario autenticado
            const cookies = Cookies.get()
            if (!cookies.token) { // Si no existe el token no esta autenticado
                setIsAuthenticated(false)
                setLoading(false) // 
                return setUser(null)
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) { // S no hay respuesta el token no es valido 
                    setIsAuthenticated(false)
                    setLoading(false)
                    return 
                }
                
                // si paso las validaciones anteriores el token existe y es valido 
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false) 
            } catch (error) { // si hubo un error no esta autenticado
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            } 
              
        }
        checkLogin()
    }, [])

    // Retornar parametros y funciones para ser usardos mediante las demas paginas
    return (
        <AuthContex.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated, 
            errors,
            loading,
        }}>
            {children}
        </AuthContex.Provider>
    )
}