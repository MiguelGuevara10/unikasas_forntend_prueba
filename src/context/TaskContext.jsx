import { createContext, useContext, useEffect, useState } from "react"
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest, reportTaskRequest, getTasksFilterRequest } from "../api/task"
import reportModules from "../libs/report"

// Crear contexto de tareas
const TaskContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("useTask must be used within a TaskProvider")
    }

    return context
} 

// Creacion de provider de tareas
// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {

    // Definir estados iniciales de productos  
    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])
    
    // Traer todas las tareas de un usuario logueado
    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer tareas con filtro de busqueda
    const getTasksFilter = async (query) => {
        try {
            const res = await  getTasksFilterRequest(query.query)
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Crear una tarea
    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            return res
            // console.log(res)
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar una tarea
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            // console.log(res)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
            setSucces(["Tarea eliminada con exito"])
        } catch (error) {
            console.log(error)
        }
    }

    // Traer una tarea mediante su id
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Acualizar una tarea mediante id
    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Generar reporte pdf o excel
    const reportTask = async (data) => {
        try {
            const res = await reportTaskRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_tareas"
            
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
        <TaskContext.Provider value={{
            tasks,
            getTasks,
            createTask,
            deleteTask,
            getTask,
            updateTask,
            reportTask,
            getTasksFilter,
            errors,
            succes,
            setSucces,
        }}>
            {children }
        </TaskContext.Provider>
    )
}