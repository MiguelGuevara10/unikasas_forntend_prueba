import { createContext, useContext, useEffect, useState } from "react"
import { createActivityRequest, deleteActivityRequest, getActivitiesFilterRequest, getActivitiesRequest, getActivityRequest, updateActivityRequest } from "../api/activity"

// Creacion del contexto de actividades de una etapa
export const ActivityContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useActivity = () => {
    const context = useContext(ActivityContex)
    if (!context){
        throw new Error("useActivity must be used within an ActivityProvider")
    }
    return context
}

// Creacion de provider de acticidades
// eslint-disable-next-line react/prop-types
export const ActivityProvider = ({ children }) =>  {

    // Definir estados iniciales de actividades 
    const [activities, setActivities] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todas las activities
    const getActivities = async (id) => {
        try {
            const res = await getActivitiesRequest(id)
            setActivities(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer una actividad mediante su id
    const getActivity = async (id) => {
        try {
            const res = await getActivityRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Traer actividades con filtro de busqueda
    const getActivitiesFilter = async (query, id) => {
        try {
            const res = await getActivitiesFilterRequest(query.query, id)
            setActivities(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Crear una actividad
    const createActivity = async (activity) => {
        try {
            const res = await createActivityRequest(activity)
            return res
            // console.log(project)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Acualizar una actividad mediante id
    const updateActivity = async (id, activity) => {
        try {
            const res = await updateActivityRequest(id, activity)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar una actividad
    const deleteActivity = async (id) => {
        try {
            const res = await deleteActivityRequest(id)
            // console.log(res)
            if (res.status === 204) setActivities(activities.filter(activity => activity._id !== id))
            setSucces(["Acividad eliminada con exito"])
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

 // Retornar parametros y funciones para ser usados mediante las demas paginas
 return (
    <ActivityContex.Provider value={{
        activities,
        getActivities,
        getActivity,
        getActivitiesFilter,
        createActivity,
        updateActivity,
        deleteActivity,
        errors,
        succes,
        setSucces
     }}>
         {children}
     </ActivityContex.Provider>
  )
}