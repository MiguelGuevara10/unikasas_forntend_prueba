import { Link } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import Alert from "../../components/Alert"
import ProductCard from "../../components/cards/ProductCard"
import { useForm } from "react-hook-form"
import { IconCreate, IconReport } from "../../icons/iconsConstants"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import ReportModal from "../../components/modals/ReportModal"
import { useAuth } from "../../context/AuthContex"

function ProductsPage() {
    // Funciones y variables a usar en la pagina
    const { getProducts, products, reportProduct, getProductsFilter, succes: succesMessage } = useProduct()
    const { register, handleSubmit, reset } = useForm()

    // Traer productos
    useEffect(() => {
        getProducts()
    }, [])

    // Usuario registado en el sistema
    const { user } = useAuth()

    // Paginar productos 
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 9 // Número de usuarios por página

    // Calcular el índice inicial y final para mostrar los productos en la página actual
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;

    const totalPages = Math.ceil(products.length / perPage) // Calcular el número total de páginas

    // Obtener los productos para la página actual
    let productsPerPage = products.slice(startIndex, endIndex)

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
      getProductsFilter(query)
      productsPerPage = products // Cambiar a los usurios filtrados
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
          module_title={"Modulo de productos"} 
          onSubmit={onSubmit} 
          register={register} 
          text={"Buscar producto por nombre, tipo, material o tamaño..."} 
        />

        { products.length === 0 && <Alert message={"No hay productos"} color={"bg-green-500"}/> }

        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center mb-2">
          {
            user.role.privileges && user.role.privileges.includes('Crear') && 
            <Link to={"/add-product"} className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Agregar
              <IconCreate />
            </Link>
          }

          { /* Modal de reportes */
            open && 
            <ReportModal title={"Generear reporte de Productos"} reportTask={reportProduct} onCancel={handleClick}/>
          }

          {
            user.role.privileges && user.role.privileges.includes('Reportes') && 
            <Link onClick={() => { handleClick() }} 
              className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
              Reportes
              <IconReport />
            </Link>
          }
        
          <span className="font-bold flex items-center justify-center">Total productos: {products.length}</span>
          <span className="font-bold flex items-center justify-center">Inactivos: {products.filter(product => !product.state).length}</span>
          { 
            totalPages > 1 && <span className="font-bold flex items-center justify-center">Pagina: ({currentPage}) de {totalPages}</span>
          }
      </div>

      {
        succesMessage && succesMessage.map((succes, i) => (
            <Alert message={succes} color={"bg-green-500"} key={i}/>
          ))
      }

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            { /* Tarjeta de productos */
              productsPerPage && productsPerPage.map((product) => (
                <ProductCard product={ product } options={true} key={product._id}/>
              ))
            }
        </div>
            
        { /* Paginacion */
          productsPerPage.length > 0 && totalPages > 1 && (
            <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }    
    </main> 
  )
}

export default ProductsPage