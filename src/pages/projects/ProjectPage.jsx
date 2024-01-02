import { Link } from "react-router-dom"
import Alert from "../../components/Alert"
import { IconCreate, IconReport } from "../../icons/iconsConstants"
import { useProject } from "../../context/ProjectContext"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ProjectCard from "../../components/cards/ProjectCard"
import SearchBar from "../../components/SearchBar"
import Pagination from "../../components/Pagination"
import ReportModal from "../../components/modals/ReportModal"
import { useAuth } from "../../context/AuthContex"

function ProjectPage() {

    // Funciones y variables a usar en la pagina
    const { getProjects, projects, getProjectFilter, reportProducts, succes : succesMessage } = useProject()
    const { register, handleSubmit, reset } = useForm()

    // Cargar proyectos
    useEffect(() => {
      getProjects()
    }, [])

    // Usuario registado en el sistema
    const { user } = useAuth()

    // Paginar proyectos
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 9 // Número de proyectos por página

    // Calcular el índice inicial y final para mostrar los proyectos en la página actual
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;

    const totalPages = Math.ceil(projects.length / perPage) // Calcular el número total de páginas

    // Obtener los proyectos para la página actual
    let projectsPerPage = projects.slice(startIndex, endIndex)

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
      getProjectFilter(query)  
      projectsPerPage = projects // Cambiar a las proyectos filtrados
      // console.log(query)
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
      setOpen(!open)
    }

  return (
    <main className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">
    
      <SearchBar /* Barra de busqueda */
        module_title={"Modulo de proyectos"} 
        onSubmit={onSubmit} 
        register={register} 
        text={"Buscar proyecto por nombre, responsable, ciudad o estado..."} 
      />

      { projects.length === 0 && <Alert message={"No hay proyectos"} color={"bg-green-500"}/> }
      
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-center mb-2">
      { user.role.privileges && user.role.privileges.includes('Crear') && 
        <Link to={"/add-project"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          Agregar
          <IconCreate />
      </Link>
      }

        { /* Modal de reportes */
            open && 
            <ReportModal title={"Generear reporte de Proyectos"} reportTask={reportProducts} onCancel={handleClick}/>
        }

        { user.role.privileges && user.role.privileges.includes('Reportes') && 
          <Link onClick={() => { handleClick() }} 
              className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Reportes
              <IconReport />
          </Link>
        }

        <span className="font-bold flex items-center justify-center">Total proyectos: {projects.length}</span>
        <span className="font-bold flex items-center justify-center">En ejecución: {projects.filter(project => project.state === "En ejecución").length}</span>
        <span className="font-bold flex items-center justify-center">Suspendidos: {projects.filter(project => project.state === "Suspendido").length}</span>
        <span className="font-bold flex items-center justify-center">Finalizados: {projects.filter(project => project.state === "Finalizado").length}</span>
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
          projectsPerPage && projectsPerPage.map((project) => (
            <ProjectCard project={ project } key={project._id}/>
            ))
          }
      </div>

      { /* Paginacion  */
          projectsPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
      }
    </main>
  )
}

export default ProjectPage