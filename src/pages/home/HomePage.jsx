import { useEffect, useState } from "react"
import { useProduct } from "../../context/ProductContext"
import ProductCard from "../../components/cards/ProductCard"
import Alert from "../../components/Alert"
import { useForm } from "react-hook-form"
import Pagination from "../../components/Pagination"
import SearchBar from "../../components/SearchBar"
import { useQuote } from "../../context/QuoteContext"

function HomePage() {

    // Funciones para traer productos registrados al catalogo
    const { getProductsCatalogue, products, getProductsFilterCatalogue } = useProduct()
    const { succes: succesMessage } = useQuote()
    const { register, handleSubmit, reset } = useForm()

    useEffect (() => {
      getProductsCatalogue()
    }, [])

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
      try {
        await getProductsFilterCatalogue(query)  
        productsPerPage = products // Cambiar a los usurios filtrados
        reset() // Limpiar la barra de busqueda
      } catch (error) {
        console.error(error)
      }
    })

    // Esta función se ejecutará cuando currentPage cambie para volver al inicio de la pagina
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage])

  return (
    <main className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">
        <SearchBar /* Barra de busqueda */
          module_title={"Nuestro catalogo de productos"} 
          onSubmit={onSubmit} 
          register={register} 
          text={"Buscar producto por nombre, tipo, material o tamaño..."} 
        />

        { products.length === 0 && <Alert message={"No hay productos"} color={"bg-green-500"}/> }

        {
          succesMessage && succesMessage.map((succes, i) => (
              <Alert message={succes} color={"bg-green-500"} key={i}/>
            ))
        }

        <article className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            { /* Tarjeta de productos */
              productsPerPage && productsPerPage.map((product) => (
                <ProductCard product={ product } options={false} key={product._id}/>
              ))
            }
        </article>

        { /* Paginacion */
          productsPerPage.length > 0 && totalPages > 1 && (
            <Pagination goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} currentPage={currentPage} totalPages={totalPages} />
          )
        }
    </main>
  )
}

export default HomePage