import { useEffect } from "react"
import { useTask } from "../../context/TaskContext"
import TaskCard from "../../components/TaskCard"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconCreate, IconReport, IconSearch } from "../../icons/iconsConstants"

function TaskPage() {
  // Funciones y variables a usar en la pagina
  const { getTasks, tasks, reportTask, getTasksFilter, succes: succesMessage } = useTask()
  const { register, handleSubmit, reset } = useForm()

  // Cargar tareas
  useEffect(() => {
    getTasks()
  }, [])

  // Filtro de busqueda de tareas
  const onSubmit = handleSubmit(async (query)=> {
    getTasksFilter(query)  
    reset()
  })

  return (
    <div className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">
      <div className="mx-auto max-w-lg text-center mb-3">
          <h2 className="text-3xl font-bold sm:text-2xl mb-2">Buscar Tareas</h2>

          <form onSubmit={onSubmit}>
            <div className="flex justify-center">
              <input 
                  type="text" 
                  placeholder="Buscar tareas por titulo o descripcion..." 
                  {...register('query')}
                  className="w-full rounded-md px-4 py-2 border border-black-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
              <button 
                  type="submit" 
                  className="flex flex-row items-center ml-2 rounded-md text-white px-4 py-2 orange font-bold hover:text-gray-700 space-x-1" 
                  >Buscar
                  <IconSearch />
              </button>
            </div>
          </form>

        </div>

      { tasks.length === 0 && <Alert message={"No hay tareas"} color={"bg-green-500"}/> }
      
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-2 text-center mb-2">
        <button className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
            <Link to="/add-task">Agregar</Link>
            <IconCreate />
        </button>

        <button className="red flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          <Link 
              onClick={()=> { reportTask(true) }}
          >Reporte PDF</Link>
          <IconReport />
        </button>

        <button className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          <Link 
              onClick={()=> { reportTask(false) }}
          >Reporte Excel</Link>
          <IconReport />
        </button>

        <span className="font-bold">Total tareas: {tasks.length}</span>
      </div>

      {
        succesMessage && succesMessage.map((succes, i) => (
            <Alert message={succes} color={"bg-green-500"} key={i}/>
          ))
      }

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          tasks && tasks.map(task => (
            <TaskCard task={ task } key={task._id}/>
          ))
        }
      </div>
    </div> 
  )
}

export default TaskPage