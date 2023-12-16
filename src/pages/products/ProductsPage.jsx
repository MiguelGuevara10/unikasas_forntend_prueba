import { Link } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect } from "react"
import Alert from "../../components/Alert"
import ProductCard from "../../components/ProductCard"
import { useForm } from "react-hook-form"
import { IconCreate, IconReport, IconSearch } from "../../icons/iconsConstants"

function ProductsPage() {
    // Funciones y variables a usar en la pagina
    const { getProducts, products, reportProduct, getProductsFilter, succes: succesMessage } = useProduct()
    const { register, handleSubmit, reset } = useForm()

    // Traer productos
    useEffect(() => {
        getProducts()
    }, [])

    // Filtro de busqueda de productos
    const onSubmit = handleSubmit(async (query)=> {
      getProductsFilter(query)  
      reset() // Limpiar la barra de busqueda
    })

  return (
    <div className="px-4 py-4 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="mx-auto max-w-lg text-center mb-3">
          <h2 className="text-3xl font-bold sm:text-2xl mb-2">Buscar Productos</h2>

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

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-2 text-center mb-2">
        <button className="orange flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
            <Link to="/add-product">Agregar</Link>
            <IconCreate />
        </button>

        <button className="red flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          <Link 
              onClick={()=> { reportProduct(true) }}
          >Reporte PDF</Link>
          <IconReport />
        </button>

        <button className="green flex flex-row items-center justify-center text-white text-lg px-2 py-1 rounded-md mb-2 font-bold hover:text-gray-700 space-x-1">
          <Link 
              onClick={()=> { reportProduct(false) }}
          >Reporte Excel</Link>
          <IconReport />
        </button>
        
        <span className="font-bold">Total productos: {products.length}</span>
        <span className="font-bold">Inactivos: {products.filter(product => !product.state).length}</span>
      </div>

      {
        succesMessage && succesMessage.map((succes, i) => (
            <Alert message={succes} color={"bg-green-500"} key={i}/>
          ))
      }

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            { 
              products && products.map(product => (
                <ProductCard product={ product } options={true} key={product._id}/>
              )) 
            }
        </div>
      
    </div> 
  )
}

export default ProductsPage