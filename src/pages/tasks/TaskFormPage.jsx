import {useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alert from '../../components/Alert'
import { IconBack, IconClose, IconSave } from '../../icons/iconsConstants'

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function TashFormPage() {

  // Funciones y variables a usar en el formulario
  const { register, handleSubmit, setValue, formState: { errors} } = useForm()
  const [loadingTask, setLoadingTask] = useState(false)

  const { createTask, getTask, updateTask, errors: errorsMessage, setSucces } = useTask()
  const navigate = useNavigate()  
  const params = useParams()

  // Cargar informacion de la tarea en caso de ser un update
  useEffect(() => {
    async function loadTask() {
      if (params.id && !loadingTask) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs.utc(task.date).format('YYYY-MM-DD'))

        setLoadingTask(true) // Cabiar el estado a tarea cargada
      }
    }
    loadTask()
  })

  // Enviar datos de la tarea 
  const onSubmit = handleSubmit(async (data)=> {
    try {
      // Castear fecha y si no viene agregar dia actual
      const dataValid = {
        ...data,
        date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().subtract(5, 'hour').format()
      }
  
      let res = {}
      if (params.id) { // si existe el id quere decir que es un update si no un create
        res = await updateTask(params.id, dataValid)
        setSucces(["Tarea modificada con exito"])
      } else {
        res = await createTask(dataValid)
        setSucces(["Nueva tarea agregada con exito"])
      }
      if (res.status == 200) navigate("/tasks") // retornar a teareas
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <main className="flex justify-center items-center px-800 m-2">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={"/tasks"}>
                    <IconBack />
                </Link>
                <h2 className="text-2xl font-bold mb-4 text-center">{ params.id ? "Editar tarea" : "Agregar tarea"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                <div className="mb-2">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Titulo</label>
                    <input 
                        id='title'
                        type="text" 
                        {...register('title', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Titulo de la tarea" 
                    />
                </div>

                { errors.title && <Alert message={"El titulo de la tarea es requerido"} color={"bg-red-500"}/> }
                
                <div className="mb-2">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea 
                        id='description'
                        rows="3" 
                        {...register('description', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Descripcion de la tarea" 
                    />
                </div>

                { errors.description && <Alert message={"La descripción de la tarea es requerida"} color={"bg-red-500"}/>}

                <div className="mb-2">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Fecha</label>
                    <input 
                        id='date'
                        type="date" 
                        {...register('date')} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                    />
                </div>

                <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-row lg:flex-row">
                    <button 
                      type='submit'
                      className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Guardar
                        <IconSave />
                    </button>

                    <Link 
                        to={"/tasks"}
                        className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Cancelar                           
                        <IconClose />
                    </Link> 
            </div>

            </form>
        </main>
  )
}

export default TashFormPage