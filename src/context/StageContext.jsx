import { createContext, useContext, useEffect, useState } from "react"
import { createStageRequest, deleteStageRequest, getStageRequest, getStagesFilterRequest, getStagesRequest, updateStageRequest } from "../api/stage"

// Creacion del contexto de Etapas
export const StageContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useStage = () => {
    const context = useContext(StageContex)
    if (!context){
        throw new Error("useUser must be used within an StageProvider")
    }
    return context
}

// Creacion de provider de etapas
// eslint-disable-next-line react/prop-types
export const StageProvider = ({ children }) => {

    // Definir estados iniciales de etapas
    const [stages, setStages] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todos las tareas de un proyecto por el id de proyecto
    const getStages = async (id) => {
        try {
            const res = await getStagesRequest(id)
            setStages(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer una etapa mediante su id
    const getStage = async (id) => {
        try {
            const res = await getStageRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Traer etapas con filtro de busqueda
    const getStageFilter = async (query, id) => {
        try {
            const res = await getStagesFilterRequest(query.query, id)
            setStages(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Crear una etapa
    const createStage = async (stage) => {
        try {
            const res = await createStageRequest(stage)
            return res
            // console.log(user)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Acualizar una etapa mediante id
    const updateStage = async (id, stage) => {
        try {
            const res = await updateStageRequest(id, stage)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar una etapa
    const deleteStage = async (id) => {
        try {
            const res = await deleteStageRequest(id)
            // console.log(res)
            if (res.status === 204) setStages(stages.filter(stage => stage._id !== id))
            setSucces(["Etapa eliminada con exito"])
        } catch (error) {
            console.log(error)
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
    <StageContex.Provider value={{
        stages,
        getStages,
        getStage,
        getStageFilter,
        createStage,
        updateStage,
        deleteStage,
        errors,
        succes,
        setSucces
    }}>
        {children}
    </StageContex.Provider>
)
}