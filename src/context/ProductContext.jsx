import { createContext, useContext, useEffect, useState } from "react"
import { createProductRequest, deleteProductRequest, getProductRequest, getProductsFilterRequest, getProductsRequest, getProductsRequestCatalogue, updateProductRequest } from "../api/product"

// Crear contexto de productos
const ProductContext = createContext()

export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider")
    }

    return context
} 

// Creacion de provider de productos
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
    const reportProduct = async (isPdf) => {
        try {
            const data = {
                isPdf
            }
            console.log(data)
            // const res = await reportTaskRequest(data)
            // // console.log(res)
            // if (res.data.type == 'application/pdf') {
            //     const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            //     window.open(url, '_blank'); // Abre el PDF en una nueva ventana
            // } else {
            //     const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            //     window.open(url, '_blank'); // Descarga el Ecxel del navegador
            // }
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
            reportProduct,
            errors,
            succes,
            setSucces,
        }}>
        { children }
    </ProductContext.Provider>
  )
}