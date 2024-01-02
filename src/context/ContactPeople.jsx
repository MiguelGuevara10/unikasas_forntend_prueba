import { createContext, useContext, useEffect, useState } from "react"
import { getContactsFilterRequest, getContactsRequest, reportContactsRequest } from "../api/contactspeoples"
import reportModules from "../libs/report"

// Creacion del contexto de contactos de personas
export const ContactContex = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useContact = () => {
    const context = useContext(ContactContex)
    if (!context){
        throw new Error("useContact must be used within an ContactProvider")
    }
    return context
}

// Creacion de provider de acticidades
// eslint-disable-next-line react/prop-types
export const ContactProvider = ({ children }) =>  {

    // Definir estados iniciales de actividades 
    const [contacts, setContacts] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([])

    // Traer todas los contactos de personas
    const getContacts = async () => {
        try {
            const res = await getContactsRequest()
            setContacts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer contactos con filtro de busqueda
    const getContactsFilter = async (query) => {
        try {
            const res = await getContactsFilterRequest(query.query)
            // console.log(res)
            setContacts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Generar reporte pdf o excel
    const reportContacts = async (data) => {
        try {
            const res = await reportContactsRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_contactos"

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

 // Retornar parametros y funciones para ser usados mediante las demas paginas
 return (
    <ContactContex.Provider value={{
        contacts,
        getContacts,
        getContactsFilter,
        reportContacts,
        succes,
        errors,
        setSucces,
     }}>
         {children}
     </ContactContex.Provider>
  )
}