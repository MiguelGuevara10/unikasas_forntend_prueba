import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconClose, IconSave } from "../../icons/iconsConstants"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useQuote } from "../../context/QuoteContext"
import { useAuth } from "../../context/AuthContex"

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function QuoteFormPage() {

  // Funciones y variables a usar en el formulario
  const { register, handleSubmit, setValue, formState: { errors} } = useForm()
  const { createQuote, updateQuote, getQuote, errors: errorsMessage, setSucces } = useQuote()

  const { isAuthenticated } = useAuth()
  const [loadingQuote, setloadingQuote] = useState(false)
  const naviagate = useNavigate()
  const params = useParams()

   // Traer productos para selecionar en el formulario
   const { products, getProducts, setProducts } = useProduct()

  // Cargar informacion de la tarea en caso de ser un update
  useEffect(() => {
    async function loadTask() {
      if (params.id && !loadingQuote) {
        const quote = await getQuote(params.id)
        setValue('name', quote.name)
        setValue('email', quote.email)
        setValue('phone', quote.phone)
        setValue('city', quote.city)
        setValue('product', quote.product)
        setValue('location', quote.location)
        setValue('date', dayjs.utc(quote.date).format('YYYY-MM-DD'))
        setValue('comments', quote.comments)

        setloadingQuote(true) // Cabiar el estado a tarea cargada
      } else if (params.productId && !loadingQuote){ // Si se esta cotizando desde un producto se selecciona
          setValue('product', params.productId)  
          setloadingQuote(true) // Cabiar el estado a tarea cargada        
      }
    }
    loadTask()
  })

  // Traer productos
  useEffect(() => {
    getProducts()
  }, [])

//   const location = useLocation()
//   const searchParams = new URLSearchParams(location.search)
//   const productId = searchParams.get('productid');

  // Enviar datos de la cotizacion
  const onSubmit = handleSubmit(async (data)=> {
    const dataValid = {
        ...data,
        phone: parseInt(data.phone),
        date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().subtract(5, 'hour').format()
    }
    let res = {}
    if (params.id) { // si existe el id quere decir que es un update si no un create
        res = await updateQuote(params.id, dataValid)
        setSucces(["Cotización modificada con exito"])
    } else {
        res = await createQuote(dataValid)
        setSucces(["Nueva cotización agregada con exito"])
    }
    if (res.status === 200) {
        if (isAuthenticated) {
            naviagate("/quotes")
        } else {
            naviagate("/")
        }
    }
  })

  return (
    <div className="mt-4 mb-4 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-md p-8 max-w-screen-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">{isAuthenticated ? "Crear o editar cotización" : "Crear cotización"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombres y apellidos</label>
                            <input 
                                type='text'
                                placeholder="Nombrey apellidos" 
                                {...register('name', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.name && <Alert message={"El nombre y los apellidos son requeridos"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo electronico</label>
                            <input 
                                type='email'
                                placeholder="Correo eletronico" 
                                {...register('email', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.email && <Alert message={"La correo es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefono</label>
                            <input 
                                type='text'
                                placeholder="Telefono" 
                                {...register('phone', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.phone && <Alert message={"El telefono es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Ciudad</label>
                            <select
                                id="city"
                                type="select"
                                {...register('city', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                {/* <option value="" disabled selected>Seleccione una ciudad</option> */}
                                <option value="Fusagasugá" selected>Fusagasugá</option>
                                <option value="Arauca">Arauca</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Bogota">Bogota</option>
                                <option value="Boyaca">Boyaca</option>
                                <option value="Cartagena">Cartagena</option>
                                <option value="Cali">Cali</option>
                                <option value="Medellin">Medellin</option>
                                <option value="Popayan">Popayan</option>
                                <option value="Tunja">Tunja</option>
                                <option value="Villavicencio">Villavicencio</option>
                                <option>Otra</option>
                            </select>
                            { errors.city && <Alert message={"La ciudad es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">Producto a cotizar</label>
                            <select
                                id="product"
                                type="select"
                                {...register('product', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                <option value="" disabled selected>Seleccione un producto</option>
                                { products && products.map((product, i) => (
                                     <option value={product._id} key={i}>{product.name}</option>
                                   ))
                                }
                            </select>
                            { errors.state && <Alert message={"El producto a cotizar es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Ubicación del cotizante</label>
                            <input 
                                type='text'
                                placeholder="Ingrese su ubicación" 
                                {...register('location', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.type && <Alert message={"La ubicación es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Fceha</label>
                            <input 
                                type='date'
                                {...register('date', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                            />
                            { errors.date && <Alert message={"La fecha es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">Comentarios</label>
                            <textarea 
                                rows='3' 
                                {...register('comments', { required: true})} 
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                placeholder="Dejanos tus comentarios aquí..">
                            </textarea>
                        </div>

                        {/* <div className="mb-1">
                            <input 
                                type='hidden'
                                value={"p"}
                                {...register('state', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                        </div> */}

                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>
                        <button className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            <Link to={isAuthenticated ? "/quotes" : "/"}>Cancelar</Link>
                            <IconClose />
                        </button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default QuoteFormPage