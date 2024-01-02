import { Link } from "react-router-dom"
import { useQuote } from "../../context/QuoteContext"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconCreate, IconReport } from "../../icons/iconsConstants"
import QuoteCard from "../../components/cards/QuoteCard"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import ReportModal from "../../components/modals/ReportModal"
import { useAuth } from "../../context/AuthContex"

function QuotePage() {

  // Funciones y variables a usar en la pagina
  const { getQuotes, quotes, getQuoteFilter, reportQuote, succes: succesMessage } = useQuote()
  const { register, handleSubmit, reset } = useForm()

  // Cargar tareas
  useEffect(() => {
    getQuotes()
  }, [])

  // Usuario registado en el sistema
  const { user } = useAuth()

  // Paginar cotizaciones
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9 // Número de cotizaciones por página

  // Calcular el índice inicial y final para mostrar las cotizaciones en la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const totalPages = Math.ceil(quotes.length / perPage) // Calcular el número total de páginas

  // Obtener las cotizaciones para la página actual
  let quotesPerPage = quotes.slice(startIndex, endIndex)

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

  // Filtro de busqueda de tareas
  const onSubmit = handleSubmit(async (query)=> {
    getQuoteFilter(query)  
    quotesPerPage = quotes // Cambiar a las cotizaciones filtradas
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
        module_title={"Modulo de cotizaciones"} 
        onSubmit={onSubmit} 
        register={register} 
        text={"Buscar cotizaciones por nombre cotizante, email, ciudad o estado.."} 
      />

      { quotes.length === 0 && <Alert message={"No hay cotizaciones"} color={"bg-green-500"}/> }
      
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mb-2">
        {
          user.role.privileges && user.role.privileges.includes('Crear') &&
            <Link to={"/add-quote"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Agregar
              <IconCreate />
          </Link>
        }

        { /* Modal de reportes */
            open && 
            <ReportModal title={"Generear reporte de Cotizaciones"} reportTask={reportQuote} onCancel={handleClick}/>
        }

        {
          user.role.privileges && user.role.privileges.includes('Reportes') && 
            <Link onClick={() => { handleClick() }} 
              className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Reportes
              <IconReport />
           </Link>
        }

        <span className="font-bold flex items-center justify-center">Total cotizaciones: {quotes.length}</span>
        <span className="font-bold flex items-center justify-center">Por responder: {quotes.filter(quote => quote.state === "pendiente").length}</span>
        <span className="font-bold flex items-center justify-center">Respondidas: {quotes.filter(quote => quote.state === "respondida").length}</span>
        <span className="font-bold flex items-center justify-center">Canceladas: {quotes.filter(quote => quote.state === "cancelada").length}</span>
        <span className="font-bold flex items-center justify-center">Completadas: {quotes.filter(quote => quote.state === "completada").length}</span>
        <span className="font-bold flex items-center justify-center">Finalizadas: {quotes.filter(quote => quote.state === "finalizada").length}</span>
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
        { /* Tarjeta de cotizaciones  */
          quotes && quotes.map(quote => (
            <QuoteCard quote={ quote } key={quote._id}/>
          ))
        }
      </div>

      { /* Paginacion  */
          quotesPerPage.length > 0 && totalPages > 1 && (
              <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
      }
    </main>
  )
}

export default QuotePage