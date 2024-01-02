import { useEffect, useState } from "react"
import { useTask } from "../../context/TaskContext"
import TaskCard from "../../components/cards/TaskCard"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconCreate, IconReport } from "../../icons/iconsConstants"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import ReportModal from "../../components/modals/ReportModal"

function TaskPage() {
  // Funciones y variables a usar en la pagina
  const { getTasks, tasks, reportTask, getTasksFilter, succes: succesMessage } = useTask()
  const { register, handleSubmit, reset } = useForm()

  // Cargar tareas
  useEffect(() => {
    getTasks()
  }, [])

  // Paginar tareas 
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9 // Número de tareas por página

  // Calcular el índice inicial y final para mostrar los tareas en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const totalPages = Math.ceil(tasks.length / perPage) // Calcular el número total de páginas

  // Obtener los tareas para la página actual
  let tasksPerPage = tasks.slice(startIndex, endIndex)

  // Cambiar a la página anterior
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  // Filtro de busqueda de tareas
  const onSubmit = handleSubmit(async (query)=> {
    getTasksFilter(query)  
    tasksPerPage = tasks // Cambiar a las tareas filtradas
    reset()
  })

  // Esta función se ejecutará cuando currentPage cambie para volver al inicio de la pagina
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

    // Modal de reportes
    const [open, setOpen] = useState(false)

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open);
    }

  return (
    <main className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">

      <SearchBar /* Barra de busqueda */
        module_title={"Modulo de tareas"} 
        onSubmit={onSubmit} 
        register={register} 
        text={"Buscar tareas por titulo o descripcion..."} 
      />

      { tasks.length === 0 && <Alert message={"No hay tareas"} color={"bg-green-500"}/> }
      
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-2">
        <Link to={"/add-task"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
            Agregar
            <IconCreate />
        </Link>

        { /* Modal de reportes */
          open && 
          <ReportModal title={"Generear reporte de Tareas"} reportTask={reportTask} onCancel={handleClick}/>
        }

        <Link onClick={() => { handleClick() }} 
          className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          Reportes
          <IconReport />
        </Link>

        <span className="font-bold flex items-center justify-center">Total tareas: {tasks.length}</span>
        {
          totalPages > 1 && <span className="font-bold flex items-center justify-center">Pagina: ({currentPage}) de {totalPages}</span>
        }
      </div>

      {
        succesMessage && succesMessage.map((succes, i) => (
            <Alert message={succes} color={"bg-green-500"} key={i}/>
          ))
      }

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        { /* Tarjeta de tareas  */
          tasksPerPage && tasksPerPage.map(task => (
            <TaskCard task={ task } key={task._id}/>
          ))
        }
      </div>

      { /* Paginacion  */
          tasksPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }
    </main> 
  )
}

export default TaskPage