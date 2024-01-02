import { createContext, useContext, useEffect, useState } from "react"
import { createProjectRequest, deleteProjectRequest, getProjectFilterRequest, getProjectRequest, getProjectsRequest, reportProjectRequest, updateProjectRequest } from "../api/project"
import reportModules from "../libs/report"

// Creacion del contexto de usuario
export const ProjectContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => {
    const context = useContext(ProjectContex)
    if (!context){
        throw new Error("useProject must be used within an ProjectProvider")
    }
    return context
}

// Creacion de provider de proyectos
// eslint-disable-next-line react/prop-types
export const ProjectProvider = ({ children }) =>  {

    // Definir estados iniciales de usuarios 
    const [projects, setProjects] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todos los proyectos
    const getProjects = async () => {
        try {
            const res = await getProjectsRequest()
            setProjects(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer proyectos con filtro de busqueda
    const getProjectFilter = async (query) => {
        try {
            const res = await  getProjectFilterRequest(query.query)
            setProjects(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Traer una proyecto mediante su id
    const getProject = async (id) => {
        try {
            const res = await getProjectRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Crear un proyecto
    const createProject = async (project) => {
        try {
            const res = await createProjectRequest(project)
            return res
            // console.log(project)
        } catch (error) {
            console.error(error)
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    // Acualizar un proyecto mediante id
    const updateProject = async (id, project) => {
        try {
            const res = await updateProjectRequest(id, project)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar una usuario
    const deleteProduct = async (id) => {
        try {
            const res = await deleteProjectRequest(id)
            // console.log(res)
            if (res.status === 204) setProjects(projects.filter(project => project._id !== id))
            setSucces(["Proyecto eliminado con exito"])
        } catch (error) {
            console.log(error)
        }
    }

    // Generar reporte pdf o excel
    const reportProducts = async (data) => {
        try {
            const res = await reportProjectRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            
            let fileName = "reporte_proyectos"
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

  // Retornar parametros y funciones para ser usados mediante las demas paginas
  return (
    <ProjectContex.Provider value={{
        projects,
        getProjects,
        getProject,
        getProjectFilter,
        createProject,
        updateProject,
        deleteProduct,
        reportProducts,
        errors,
        succes,
        setSucces,
     }}>
         {children}
     </ProjectContex.Provider>
  )
}
