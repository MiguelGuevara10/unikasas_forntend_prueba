import { createContext, useContext, useEffect, useState } from "react"
import { createUserRequest, deleteUserRequest, getUserRequest, getUsersFilterRequest, getUsersRequest, reportUserRequest, updateUserRequest } from "../api/user"
import reportModules from "../libs/report"

// Creacion del contexto de usuario
export const UserContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContex)
    if (!context){
        throw new Error("useUser must be used within an UserProvider")
    }
    return context
}

// Creacion de provider de usuarios
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {

    // Definir estados iniciales de usuarios 
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todos los usuarios
    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer usuarios con filtro de busqueda
    const getUsersFilter = async (query) => {
        try {
            const res = await  getUsersFilterRequest(query.query)
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer una usuario mediante su id
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Crear una usuario
    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user)
            return res
            // console.log(user)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Acualizar un usuario mediante id
    const updateUser = async (id, product) => {
        try {
            const res = await updateUserRequest(id, product)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar una usuario
    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            // console.log(res)
            if (res.status === 204) setUsers(users.filter(user => user._id !== id))
            setSucces(["Usuario eliminado con exito"])
        } catch (error) {
            console.log(error)
        }
    }

    // Generar reporte pdf o excel
    const reportUsers = async (data) => {
        try {
            const res = await reportUserRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_usuarios"
            
            // Funcion de generacion del reporte
            reportModules(blob, fileName, data.report)

            return true // Delvover que el reporte se genero con exito
        } catch (error) {
            console.error(error)
        }
    }

    // Eliminacion de errores a diligenciar datos no validos en el formulario
    useEffect(() => {
        if (errors.length > 0 || succes.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
                setSucces([])  
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors, succes])

  // Retornar parametros y funciones para ser usardos mediante las demas paginas
  return (
        <UserContex.Provider value={{
           users,
           getUsers,
           getUser,
           getUsersFilter,
           createUser,
           updateUser,
           deleteUser,
           reportUsers,
           succes,
           errors,
           setSucces,
        }}>
            {children}
        </UserContex.Provider>
    )
}