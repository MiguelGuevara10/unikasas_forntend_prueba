import { useForm } from 'react-hook-form'
import Alert from '../../components/Alert'
import { IconBack, IconClose, IconSave } from '../../icons/iconsConstants'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuote } from '../../context/QuoteContext'

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function ReplyFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm ()

    const { getQuote, updateQuote, errors: errorsMessage, setSucces, setErrors } = useQuote()

    const [loadingQuote, setloadingQuote] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    // Cargar informacion de la tarea en caso de ser un update
    useEffect(() => {
        async function loadQuote() {
            if (params.id && !loadingQuote) {
                const quote = await getQuote(params.id)
                setValue('name', quote.name)
                setValue('email', quote.email)
                setValue('phone', quote.phone)
                setValue('city', quote.city)
                setValue('product', quote.product.name)
                setValue('location', quote.location)
                setValue('date', dayjs.utc(quote.date).format('YYYY-MM-DD'))
                setValue('comments', quote.comments)
                setValue('state', quote.state)

                setloadingQuote(true) // Cabiar el estado a tarea cargada
            } 
        }
        loadQuote()
    })

    // Enviar datos de la cotizacion
    const onSubmit = handleSubmit(async (data)=> {
        try {
            const dataValid = {
                ...data,
                phone: parseInt(data.phone),
                date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().subtract(5, 'hour').format()
            }
            if (dataValid.state === 'pendiente') {
                setErrors(["Cambie el estado de respuesta aun se encuentra en pendiente"])
            } else {
                delete dataValid.product
                const res = await updateQuote(params.id, dataValid)
                setSucces(["Cotización contestada con exito"])
                if (res.status === 200) navigate('/quotes')
            }  
        } catch (error) {
            console.log(error)
        }
        
    })

  return (
    <main className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <button onClick={ () => navigate("/quotes")} >
                <IconBack />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Responder cotización</h2>

                <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-70 font-bold mb-2">Nombres y apellidos</label>
                            <input 
                                id='name'
                                type='text'
                                readOnly
                                {...register('name')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2" 
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo electronico</label>
                            <input 
                                id='email'
                                type='email'
                                readOnly
                                {...register('email')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2" 
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefono</label>
                            <input 
                                id='phone'
                                type='text' 
                                readOnly
                                {...register('phone')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2" 
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Ciudad</label>
                            <input
                                id="city"
                                type="text"
                                readOnly
                                {...register('city')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2"
                                >
                            </input>
                        </div>

                        <div className="mb-1">
                            <label htmlFor="product" className="block text-gray-700 font-bold mb-2">Producto cotizado</label>
                            <input
                                id="product"
                                type="text"
                                readOnly
                                {...register('product')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2"
                                >
                            </input>
                        </div>

                        <div className="mb-1">
                            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Ubicación del cotizante</label>
                            <input 
                                id='location'
                                type='text'
                                readOnly
                                {...register('location')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2" 
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Fecha</label>
                            <input 
                                id='date'
                                type='date'
                                readOnly
                                {...register('date')}
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2"
                            />
                        </div>

                        <div className="mb-1">
                            <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">Comentarios</label>
                            <textarea
                                id='comments' 
                                rows='3' 
                                readOnly
                                {...register('comments')} 
                                className="w-full border border-gray-300 bg-blue-100 rounded-md px-3 py-2" 
                                >
                            </textarea>
                        </div>

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

                        <div className="mb-1">
                            <label htmlFor="response" className="block text-gray-700 font-bold mb-2">Respuesta</label>
                            <textarea 
                                id='response'
                                rows='3' 
                                {...register('response', { required: true})} 
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                placeholder="Escriba aqui la respuesta para el cliente..">
                            </textarea>
                            { errors.response && <Alert message={"La respuesta es requerida"} color={"bg-red-500"}/> }
                        </div>

                    </div>

                    {
                        errorsMessage && errorsMessage.map((error, i) => (
                            <Alert message={error} color={"bg-red-500"} key={i}/>
                        ))
                    }

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link to={"/quotes"} className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </main>
  )
}

export default ReplyFormPage