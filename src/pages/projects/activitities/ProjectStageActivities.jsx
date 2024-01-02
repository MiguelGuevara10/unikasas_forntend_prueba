import { Link, useNavigate, useParams } from "react-router-dom"
import Alert from "../../../components/Alert"
import { IconBack, IconCreate } from "../../../icons/iconsConstants"
import { useActivity } from "../../../context/ActivityContext"
import { useEffect, useState } from "react"
import ProjectStageActivityCard from "../../../components/cards/ProjectStageActivityCard"
import { useProject } from "../../../context/ProjectContext"
import { useForm } from "react-hook-form"

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import SearchBar from "../../../components/SearchBar"
import Pagination from "../../../components/Pagination"
import { useAuth } from "../../../context/AuthContex"
dayjs.extend(utc)

function ProjectStageActivities() {

  // Funciones y variables a usar en el formulario
  const { activities, getActivities, getActivitiesFilter, succes: succesMessage } = useActivity()
  const { getProject } = useProject()
  const [ project, setProject ] = useState('')
  const { register, handleSubmit, reset } = useForm()
    
  const params = useParams()
  const navigate = useNavigate()

  // Cargar actividades de una etapa pasando el id de etapa
  useEffect(() => {
    getActivities(params.id)
    async function loadProject() {
        const project = await getProject(params.projectId)
        setProject(project)
    }
    loadProject()
  }, [])

  // Usuario registado en el sistema
  const { user } = useAuth()

  // Paginar actividades
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9 // Número de actividades por página

  // Calcular el índice inicial y final para mostrar las actividades en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const totalPages = Math.ceil(activities.length / perPage) // Calcular el número total de páginas

  // Obtener las actividades para la página actual
  let activitiesPerPage = activities.slice(startIndex, endIndex)

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
    getActivitiesFilter(query, params.id)
    activitiesPerPage = activities // Cambiar a las actividades filtradas
    // console.log(query)
    reset()
  })

  // Esta función se ejecutará cuando currentPage cambie para volver al inicio de la pagina
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

  return (
    <main className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">
        <button onClick={ () => navigate(`/project-stages/${params.projectId}`)} >
            <IconBack />
        </button>

        <div className="mx-auto max-w-2xl text-center mb-3">   
            <h2 className="text-3xl font-bold sm:text-2xl">Actividades de etapa de proyecto</h2>
            <h5 className="text-1xl mb-2">{project.name} - {project.city} - {project.address} - {project.responsible} - {dayjs.utc(project.start_date).format('YYYY-MM-DD')}</h5>
        </div>

        <SearchBar /* Barra de busqueda */
            module_title={""} 
            onSubmit={onSubmit} 
            register={register} 
            text={"Buscar actividad por nombre o responsable o estado..."} 
        />

        { activities.length === 0 && <Alert message={"No hay actividades para la etapa del proyecto creadas"} color={"bg-green-500"}/> }
      
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-2">
            { user.role.privileges && user.role.privileges.includes('Crear') && 
              <Link to={`/add-activities/stage/${params.id}`} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
                  Agregar
                  <IconCreate />
              </Link>
            }

            <span className="font-bold flex items-center justify-center">Total actividades: {activities.length}</span>
            <span className="font-bold flex items-center justify-center">En ejecución: {activities.filter(activity => activity.state === "En ejecución").length}</span>
            <span className="font-bold flex items-center justify-center">Suspendidas: {activities.filter(activity => activity.state === "Suspendida").length}</span>
            <span className="font-bold flex items-center justify-center">Finalizadas: {activities.filter(activity => activity.state === "Finalizada").length}</span>
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
            { /* Trajeta de proyectos */
                activitiesPerPage && activitiesPerPage.map((activity) => (
                    <ProjectStageActivityCard activity={ activity } key={activity._id}/>
                ))
            }
        </div>

        { /* Paginacion  */
          activitiesPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }
    </main>
  )
}

export default ProjectStageActivities