import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconBack, IconClose, IconSave } from "../../icons/iconsConstants"
import { Link, useNavigate, useParams } from "react-router-dom"
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

  // Mostrar el estado de la cotizacion si es update
  const [ quoteState, setQuoteState ] = useState(false)

  const { isAuthenticated } = useAuth()
  const [loadingQuote, setloadingQuote] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

   // Traer productos para selecionar en el formulario
   const { products, getProducts } = useProduct()

   // Logica para agregar otra ciudad
   const [isOtherCity, setIsOtherCity] = useState(false);
   const [otherCity, setOtherCity] = useState('');
   
   // Habilitar input de texto para escribir la ciudad
   const handleSelectChange = (event) => {
       const selectedCity = event.target.value
       if (selectedCity === 'Otra') {
           setIsOtherCity(true)
       } else {
           setIsOtherCity(false);
           setOtherCity('') // Limpiar el valor si el usuario cambia la selección
       }
   }

   // Cargar ciudad del usuario en la opcion
   useEffect(() => {
       if (otherCity !== "" && otherCity !== "Otra"){
           setValue('city', otherCity)
       }
   }, [otherCity])

  // Cargar informacion de la cotizacion en caso de ser un update
  useEffect(() => {
    async function loadQuote() {
      if (params.id && !loadingQuote) {
        const quote = await getQuote(params.id)
        setValue('name', quote.name)
        setValue('email', quote.email)
        setValue('phone', quote.phone)
        setValue('city', quote.city)
        setValue('product', quote.product._id)
        setValue('location', quote.location)
        setValue('date', dayjs.utc(quote.date).format('YYYY-MM-DD'))
        setValue('comments', quote.comments)

        // Habilitar el estado de la cotización
        setQuoteState(true)
        setValue('state', quote.state)

        // Asignar ciudad si no se encuentra en la lista select
        if (otherCity === "") {
            setOtherCity(quote.city)
        }
        setIsOtherCity(true)

        setloadingQuote(true) // Cabiar el estado a tarea cargada
      } else if (params.productId && !loadingQuote){ // Si se esta cotizando desde un producto se selecciona
          setValue('product', params.productId)  
          setloadingQuote(true) // Cabiar el estado a tarea cargada        
      }
    }
    loadQuote()
  })

  // Traer productos
  useEffect(() => {
    getProducts()
  }, [])

  // Enviar datos de la cotizacion
  const onSubmit = handleSubmit(async (data)=> {
    try {
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
            setSucces(["Cotización agregada con exito"])
        }
        if (res.status === 200) {
            if (isAuthenticated) {
                navigate("/quotes")
            } else {
                navigate("/")
            }
        }
    } catch (error) {
        console.error(error)
    }
    
  })

  return (
    <main className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <button onClick={ () => { isAuthenticated ? navigate("/quotes") : navigate("/") }} >
                <IconBack />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{isAuthenticated ? (params.id ? "Editar cotización": "Crear cotización") : "Crear cotización"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombres y apellidos</label>
                            <input 
                                id="name"
                                type='text'
                                placeholder="Nombres y apellidos" 
                                {...register('name', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.name && <Alert message={"El nombre y los apellidos son requeridos"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo electronico</label>
                            <input 
                                id="email"
                                type='email'
                                placeholder="Correo eletronico" 
                                {...register('email', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.email && <Alert message={"El correo eletronico es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefono</label>
                            <input 
                                id="phone"
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
                                onChange={handleSelectChange}
                                >
                                <option defaultValue={""} disabled>Seleccione una ciudad</option>
                                <option value="Fusagasugá">Fusagasugá</option>
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
                                <option value={otherCity === '' ? "Otra": otherCity} >{otherCity === '' ? "Otra": otherCity}</option>
                            </select>
                            {isOtherCity && ( /* Logica para agregar otra ciudad */
                                <input
                                    id="add_city"
                                    name="add_city"
                                    type="text"
                                    autoFocus
                                    value={otherCity === 'Otra' ? "": otherCity}
                                    onChange={(e) => setOtherCity(e.target.value)}    
                                    placeholder="Escribe aqui tu ciudad..."
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
                                />
                            )}
                            { errors.city && <Alert message={"La ciudad es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="product" className="block text-gray-700 font-bold mb-2">Producto a cotizar</label>
                            <select
                                id="product"
                                type="select"
                                {...register('product', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                <option defaultValue={""} disabled>Seleccione un producto</option>
                                { products && products.map((product, i) => (
                                     product.state && <option value={product._id} key={i}>{product.name}</option>
                                   ))
                                }
                            </select>
                            { errors.state && <Alert message={"El producto a cotizar es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Ubicación del cotizante</label>
                            <input 
                                id="location"
                                type='text'
                                placeholder="Ingrese su ubicación" 
                                {...register('location', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.type && <Alert message={"La ubicación es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Fecha</label>
                            <input 
                                id="date"
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
                                id="comments"
                                rows='3' 
                                {...register('comments', { required: true})} 
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                placeholder="Dejenos sus comentarios aquí..">
                            </textarea>
                        </div>

                        {
                            quoteState && 
                            <div className="mb-1">
                                <label htmlFor="state" className="block text-gray-700 font-bold mb-2">Estado</label>
                                <select
                                    id='state'
                                    type='select'
                                    {...register('state', { required: true})}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option defaultValue={"Seleccione un estado"} disabled>Seleccione un estado</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="respondida">Respondida</option>
                                    <option value="cancelada">Cancelada</option>
                                    <option value="completada">Completada - lista para proyecto</option>
                                    <option value="finalizada">Finalizada - Ya se inicio proyecto</option>
                                </select>
                                { errors.state && <Alert message={"El estado de respuesta es requerido"} color={"bg-red-500"}/> }
                            </div>
                        }

                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link to={isAuthenticated ? "/quotes" : "/"} className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </main>
  )
}

export default QuoteFormPage