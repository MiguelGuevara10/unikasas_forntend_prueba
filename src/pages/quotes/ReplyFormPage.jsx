import { useForm } from 'react-hook-form'
import Alert from '../../components/Alert'
import { useProduct } from '../../context/ProductContext'
import { IconClose, IconSave } from '../../icons/iconsConstants'
import { Link } from 'react-router-dom'

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function ReplyFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm ()
    
    // Traer productos para selecionar en el formulario
    const { products, getProducts, setProducts } = useProduct()

    // Enviar datos de la cotizacion
    const onSubmit = handleSubmit(async (data)=> {
        console.log(data)
    })

  return (
    <div className="mt-4 mb-4 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-md p-8 max-w-screen-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Resonder cotización</h2>
                {/* {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                } */}

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombres y apellidos</label>
                            <input 
                                type='text'
                                readOnly
                                {...register('name', { required: true})}
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
                            <Link to={"/quotes"}>Cancelar</Link>
                            <IconClose />
                        </button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default ReplyFormPage