import { useContact } from "../../context/ContactPeople"
import { useEffect, useState } from "react"
import Alert from "../../components/Alert"
import ContactPeopleCard from "../../components/cards/ContactPeopleCard"
import SearchBar from "../../components/SearchBar"
import { useForm } from "react-hook-form"
import Pagination from "../../components/Pagination"
import ReportModal from "../../components/modals/ReportModal"
import { Link } from "react-router-dom"
import { IconReport } from "../../icons/iconsConstants"
import { useAuth } from "../../context/AuthContex"

function ContactsPeople() {

    // Funciones y variables a usar en la pagina
  const { contacts, getContacts, getContactsFilter, reportContacts, succes: succesMessage } = useContact()
  const { register, handleSubmit, reset } = useForm()

  // Cargar contactos de personas en la pagina de inicio
  useEffect(() => {
    getContacts()
  }, [])

  // Usuario registado en el sistema
  const { user } = useAuth()

  // Paginar contactos 
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9 // Número de contactos por página

  // Calcular el índice inicial y final para mostrar los contactos en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const totalPages = Math.ceil(contacts.length / perPage) // Calcular el número total de páginas

  // Obtener los contactos para la página actual
  let contactsPerPage = contacts.slice(startIndex, endIndex)

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

  // Filtro de busqueda de productos
  const onSubmit = handleSubmit(async (query)=> {
    // console.log(query)
    getContactsFilter(query)
    contactsPerPage = contacts // Cambiar a los contactos filtrados
    reset() // Limpiar la barra de busqueda
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
          module_title={"Contactos personas - Pagina de inicio ¡Contactos!"} 
          onSubmit={onSubmit} 
          register={register} 
          text={"Buscar contacto por nombre o email..."} 
        />

        { contacts.length === 0 && <Alert message={"No hay contactos realizados en la pagina"} color={"bg-green-500"}/> }
      
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-center mb-2">
            { /* Modal de reportes */
              open && 
              <ReportModal title={"Generear reporte de Contactos"} reportTask={reportContacts} onCancel={handleClick}/>
            }

            { user.role.privileges && user.role.privileges.includes('Eliminar') &&
              <Link onClick={() => { handleClick() }} 
                className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
                Reportes
                <IconReport />
              </Link>
            }

            <span className="font-bold flex items-center justify-center">Total contactos de personas: {contacts.length}</span>
            <span className="font-bold flex items-center justify-center">Agregaron telefono: {contacts.filter(contact => contact.phone).length}</span>
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
            { /* Trajeta de contactos */
                contactsPerPage && contactsPerPage.map((contact) => (
                    <ContactPeopleCard contact={ contact } key={contact._id}/>
                ))
            }
        </div>

        { /* Paginacion */
          contactsPerPage.length > 0 && totalPages > 1 && (
            <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        } 

    </main>
    
  )
}

export default ContactsPeople