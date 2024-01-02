import { createContext, useContext, useEffect, useState } from "react"
import { createQuoteRequest, deleteQuoteRequest, getQuoteFilterRequest, getQuoteRequest, getQuotesRequest, reportQuoteRequest, updateQuoteRequest } from "../api/quote"
import reportModules from "../libs/report"

// Crear contexto de cotizaciones
const QuoteContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useQuote = () => {
    const context = useContext(QuoteContext)

    if (!context) {
        throw new Error("useQuote must be used within a QuoteProvider")
    }

    return context
} 

// Creacion de provider de cotizaciones
// eslint-disable-next-line react/prop-types
export function QuoteProvider({ children }) {

    // Definir estados iniciales de Cotizaciones
    const [quotes, setQuotes] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todas las cotizaciones
    const getQuotes = async () => {
        try {
            const res = await getQuotesRequest()
            setQuotes(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Traer cotizaciones con filtro de busqueda
    const getQuoteFilter = async (query) => {
        try {
            const res = await  getQuoteFilterRequest(query.query)
            setQuotes(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    
    // Crear una cotizacion
    const createQuote = async (quote) => {
    try {
        const res = await createQuoteRequest(quote)
        // console.log(res)
        return res
    } catch (error) {
        console.error(error)
        setErrors(error.response.data)
    }
    } 
    
    // Eliminar una tarea
    const deleteQuote = async (id) => {
        try {
            const res = await deleteQuoteRequest(id)
            // console.log(res)
            if (res.status === 204) setQuotes(quotes.filter(quote => quote._id !== id))
            setSucces(["Cotización eliminada con exito"])
        } catch (error) {
            console.error(error)
        }
    }

    // Traer una cotizacion mediante su id
    const getQuote = async (id) => {
        try {
            const res = await getQuoteRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    // Acualizar una cotizacion mediante id
    const updateQuote = async (id, quote) => {
        try {
            const res = await updateQuoteRequest(id, quote)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Generar reporte pdf o excel
    const reportQuote = async (data) => {
        try {
            const res = await reportQuoteRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_cotizaciones"

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

  return (
    <QuoteContext.Provider value={{
        quotes,
        getQuotes,
        getQuoteFilter,
        getQuote,
        createQuote,
        updateQuote,
        deleteQuote,
        reportQuote,
        errors,
        succes,
        setSucces,
        setErrors,
    }}>
        {children }
    </QuoteContext.Provider>
  )
}