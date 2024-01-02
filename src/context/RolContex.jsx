import { createContext, useContext, useEffect, useState } from "react"
import { createRoleRequest, deleteRoleRequest, getRoleRequest, getRolesFilterRequest, getRolesRequest, reportRolesRequest, updateRoleRequest } from "../api/role"
import reportModules from "../libs/report"

// Creacion del contexto de roles
export const RoleContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => {
    const context = useContext(RoleContex)
    if (!context){
        throw new Error("useRole must be used within an RoleProvider")
    }
    return context
}

// Creacion de provider de usuarios
// eslint-disable-next-line react/prop-types
export const RoleProvider = ({ children }) => {

    // Definir estados iniciales de usuarios 
    const [roles, setRoles] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todos los roles
    const getRoles = async () => {
        try {
            const res = await getRolesRequest()
            setRoles(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer roles con filtro de busqueda
    const getRolesFilter = async (query) => {
        try {
            const res = await  getRolesFilterRequest(query.query)
            setRoles(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Crear un rol
    const createRole = async (role) => {
        try {
            const res = await createRoleRequest(role)
            return res
            // console.log(res)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Traer una rol mediante su id
    const getRole = async (id) => {
        try {
            const res = await getRoleRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Acualizar un rol mediante id
    const updateRole = async (id, role) => {
        try {
            const res = await updateRoleRequest(id, role)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar un rol
    const deleteRole = async (id) => {
        try {
            const res = await deleteRoleRequest(id)
            // console.log(res)
            if (res.status === 204) setRoles(roles.filter(role => role._id !== id))
            setSucces(["Rol eliminado con exito"])
        } catch (error) {
            console.log(error)
        }
    }

    // Generar reporte pdf o excel
    const reportRoles = async (data) => {
        try {
            const res = await reportRolesRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_roles"

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
        <RoleContex.Provider value={{
            roles,
            getRoles,
            getRolesFilter,
            createRole,
            getRole,
            updateRole,
            deleteRole,
            reportRoles,
            errors,
            succes,
            setSucces
        }}>
            {children}
        </RoleContex.Provider>
    )
}