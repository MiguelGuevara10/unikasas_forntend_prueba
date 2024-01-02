import { useForm } from "react-hook-form"
import SearchBar from "../../../components/SearchBar"
import { useRole } from "../../../context/RolContex"
import Alert from "../../../components/Alert"
import { Link } from "react-router-dom"
import { IconCreate, IconReport, IconUser } from "../../../icons/iconsConstants"
import { useEffect, useState } from "react"
import RoleCard from "../../../components/cards/RoleCard"
import Pagination from "../../../components/Pagination"
import ReportModal from "../../../components/modals/ReportModal"

function RolePage() {

    const { roles, getRoles, getRolesFilter, reportRoles, succes: succesMessage } = useRole()
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        getRoles()
    }, [])

    // Paginar roles 
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 9 // Número de roles por página

    // Calcular el índice inicial y final para mostrar los roles en la página actual
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;

    const totalPages = Math.ceil(roles.length / perPage) // Calcular el número total de páginas

    // Obtener los roles para la página actual
    let rolesPerPage = roles.slice(startIndex, endIndex)

    // Cambiar a la página anterior
    const goToPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // Cambiar a la página siguiente
    const goToNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1)
        }
    }

    const onSubmit = handleSubmit(async (query)=> {
        getRolesFilter(query)  
        rolesPerPage = roles // Cambiar a los roles filtrados
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
          module_title={"Roles de usuarios"} 
          onSubmit={onSubmit} 
          register={register} 
          text={"Buscar rol por nombre..."} 
        />
  
        { roles.length === 0 && <Alert message={"No hay roles"} color={"bg-green-500"}/> }
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-2">
          <Link to={"/add-role"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Agregar
              <IconCreate />
          </Link>

          <Link to={"/users"} className="red flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Usuarios
              <IconUser />
          </Link>
  
          { /* Modal de reportes */
            open && 
            <ReportModal title={"Generear reporte de Roles"} reportTask={reportRoles} onCancel={handleClick}/>
          }

          <Link onClick={() => { handleClick() }} 
              className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Reportes
              <IconReport />
          </Link>
  
          <span className="font-bold flex items-center justify-center">Total roles: {roles.length}</span>
          {
            totalPages > 1 && <span className="font-bold flex items-center justify-center">Pagina: ({currentPage}) de {totalPages}</span>
          }
          </div>
  
        {
          succesMessage && succesMessage.map((succes, i) => (
              <Alert message={succes} color={"bg-green-500"} key={i}/>
            ))
        }
  
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          { /* Tarjeta de roles  */
            rolesPerPage && rolesPerPage.map((role) => (
              <RoleCard role={ role } key={role._id}/>
              ))
            }
        </div>

        { /* Paginacion  */
          rolesPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }
    </main>
  )
}

export default RolePage