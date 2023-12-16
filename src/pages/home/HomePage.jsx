import { useEffect } from "react"
import { useProduct } from "../../context/ProductContext"
import ProductCard from "../../components/ProductCard"
import Alert from "../../components/Alert"
import { useForm } from "react-hook-form"
import { IconSearch } from "../../icons/iconsConstants"

function HomePage() {

    // Funciones para traer productos registrados al catalogo
    const { getProductsCatalogue, products, getProductsFilter } = useProduct()
    const { register, handleSubmit, reset } = useForm()

    useEffect (() => {
      getProductsCatalogue()
    }, [])

    // Filtro de busqueda de productos
    const onSubmit = handleSubmit(async (query)=> {
      getProductsFilter(query)  
      reset() // Limpiar la barra de busqueda
    })

  return (
    <>
    <section className="">
      <div className="mx-auto max-w-screen-xl px-2 py-2 sm:px-2 sm:py-2 lg:px-2 lg:py-2">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-2xl mb-2">Catalogo de productos</h2>

          <form onSubmit={onSubmit}>
            <div className="flex justify-center">
              <input 
                  type="text" 
                  placeholder="Buscar por nombre, tipo, material, tamaño, precio..." 
                  {...register('query')}
                  className="w-full rounded-md px-4 py-2 border border-black-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
              <button 
                  type="submit" 
                  className="flex flex-row items-center ml-2 rounded-md text-white px-4 py-2 orange font-bold hover:text-gray-700 space-x-1" 
                  >Buscar
                  <IconSearch />
              </button>
            </div>
          </form>
        </div>

        { products.length === 0 && <Alert message={"No hay productos"} color={"bg-green-500"}/> }

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            { 
              products && products.map(product => (
                <ProductCard product={ product } options={false} key={product._id}/>
              )) 
            }
        </div>
        
      </div>
    </section>
    </>
  )
}

export default HomePage