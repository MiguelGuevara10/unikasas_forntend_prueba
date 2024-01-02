import { Link } from "react-router-dom"
import { IconCreate, IconReport, IconRole } from "../../icons/iconsConstants"
import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import Alert from "../../components/Alert"
import { useForm } from "react-hook-form"
import UserCard from "../../components/cards/UserCard"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import ReportModal from "../../components/modals/ReportModal"
import { useAuth } from "../../context/AuthContex"

function UserPage() {

  // Funciones y variables a usar en la pagina
  const { getUsers, getUsersFilter, reportUsers, users, succes: succesMessage } = useUser()
  const { register, handleSubmit, reset } = useForm()

  // Cargar usuarios
  useEffect(() => {
    getUsers()
  }, [])

  // Usuario registado en el sistema
  const { user } = useAuth()

  // Paginar usuarios 
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9 // Número de usuarios por página

  // Calcular el índice inicial y final para mostrar los usuarios en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const totalPages = Math.ceil(users.length / perPage) // Calcular el número total de páginas

  // Obtener los usuarios para la página actual
  let usersPerPage = users.slice(startIndex, endIndex)

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

  // Filtro de busqueda de usuarios
  const onSubmit = handleSubmit(async (query)=> {
    getUsersFilter(query)  
    usersPerPage = users // Cambiar a los usuarios filtrados
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
          module_title={"Modulo de usuarios"} 
          onSubmit={onSubmit} 
          register={register} 
          text={"Buscar usuario por nombre email o rol..."} 
        />
  
        { users.length === 0 && <Alert message={"No hay usuarios"} color={"bg-green-500"}/> }
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-2">
          {
            user.role.privileges && user.role.privileges.includes('Crear') &&
            <Link to={"/add-user"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
                Agregar
                <IconCreate />
            </Link>
          }

          {
            user.role.privileges && user.role.privileges.includes('Roles') &&
              <Link to={"/roles"} className="red flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
                Roles
                <IconRole />
              </Link>
          }
  
          { /* Modal de reportes */
            open && 
            <ReportModal title={"Generear reporte de Usuarios"} reportTask={reportUsers} onCancel={handleClick}/>
          }

          {
            user.role.privileges && user.role.privileges.includes('Reportes') &&
            <Link onClick={() => { handleClick() }} 
              className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Reportes
              <IconReport />
            </Link>
          }
  
          <span className="font-bold flex items-center justify-center">Total usuarios: {users.length}</span>
          <span className="font-bold flex items-center justify-center">Inactivos: {users.filter(user => user.state === false).length}</span>
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
          { /* Tarjeta de usuarios  */
            usersPerPage && usersPerPage.map((user) => (
              <UserCard user={ user } key={user._id}/>
              ))
            }
        </div>

        { /* Paginacion  */
          usersPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }
    </main>
  )
}

export default UserPage