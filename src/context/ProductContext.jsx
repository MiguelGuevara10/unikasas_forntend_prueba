import { createContext, useContext, useEffect, useState } from "react"
import { createProductRequest, deleteProductRequest, getProductRequest, getProductsFilterCatalogueRequest, getProductsFilterRequest, getProductsRequest, getProductsRequestCatalogue, reportProductRequest, updateProductRequest } from "../api/product"
import reportModules from "../libs/report"

// Crear contexto de productos
const ProductContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider")
    }

    return context
} 

// Creacion de provider de productos
// eslint-disable-next-line react/prop-types
export function ProductProvider({ children }) {

    // Definir estados iniciales de productos  
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState([])
    const [succes, setSucces] = useState([]) 

    // Traer todos los productos ruta autenticada
    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer productos con filtro de busqueda
    const getProductsFilter = async (query) => {
        try {
            const res = await  getProductsFilterRequest(query.query)
            // console.log(res)
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Treaer los productos para el catalogo sin atuenticacion
    const getProductsCatalogue = async () => {
        try {
            const res = await getProductsRequestCatalogue()
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Traer productos con filtro de busqueda en en catalogo
    const getProductsFilterCatalogue = async (query) => {
        try {
            const res = await  getProductsFilterCatalogueRequest(query.query)
            // console.log(res)
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Crear un producto
    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }  
    }

    // Traer una producto mediante su id
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // Acualizar un producto mediante id
    const updateProduct = async (id, product) => {
        try {
            const res = await updateProductRequest (id, product)
            return res
        } catch (error) {
            console.error(error)
            setErrors(error.response.data)
        }
    }

    // Eliminar un producto
    const deleteProdct = async (id) => {
        try {
            const res = await deleteProductRequest(id)
            // console.log(res)
            if (res.status === 204) setProducts(products.filter(product => product._id !== id))
            setSucces(["Producto eliminado con exito"])
        } catch (error) {
            console.log(error)
        }
        
    }

    // Generar reporte pdf o excel
    const reportProduct = async (data) => {
        try {
            const res = await reportProductRequest(data)
            if (res.data.size === 0) {
                return false // Devolver que no se encontraron datos para generar el reporte
            }
            const blob = new Blob([res.data])
            let fileName = "reporte_productos"

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

    // Retornar parametros y funciones para ser usardos mediante las demas paginas
    return (
        <ProductContext.Provider value={{
            products, 
            getProducts,
            setProducts,
            getProductsCatalogue,
            createProduct,
            getProduct,
            updateProduct,
            deleteProdct,
            getProductsFilter,
            getProductsFilterCatalogue,
            reportProduct,
            errors,
            succes,
            setSucces,
        }}>
        { children }
    </ProductContext.Provider>
  )
}