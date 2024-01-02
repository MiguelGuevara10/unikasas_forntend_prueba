import {useForm } from 'react-hook-form'
import { useProduct } from '../../context/ProductContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alert from '../../components/Alert'
import { IconBack, IconClose, IconSave } from '../../icons/iconsConstants'

function ProductFromPage() {

    // Funciones y variables a usar en el fromulario
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [loadingProduct, setloadingProduct] = useState(false)

    const { createProduct, getProduct, updateProduct, errors: errorsMessage, setSucces } = useProduct()
    const navigate = useNavigate()  
    const params = useParams()

    // Cargar informacion de la tarea en caso de ser un update
    useEffect(() => {
        async function loadProduct() {
            if (params.id && !loadingProduct) {
                const product = await getProduct(params.id)
                setValue('name', product.name)
                setValue('image', product.image)
                setValue('description', product.description)
                setValue('price', product.price)
                setValue('type', product.type)
                setValue('material', product.material)
                setValue('floors', product.floors)
                setValue('size', product.size)
                setValue('bedrooms', product.bedrooms)
                setValue('state', product.state)

                setloadingProduct(true) // Se cambia el estado ya que ya se cargo el producto
            }
        }
        loadProduct()
    })

    // Enviar datos del producto a crear 
    const onSubmit = handleSubmit(async (data) => {
        // Castear campos antes de enviarlos
        try {
            let dataValid = {}
            if (data.state === 'true' || data.state === 'false') {
                dataValid = {
                    ...data,
                    price: parseInt(data.price),
                    state: data.state === 'true',
                    floors: parseInt(data.floors)
                }
            } else {
                dataValid = {
                    ...data,
                    price: parseInt(data.price),
                    floors: parseInt(data.floors)
                }
            }
            let res = {}
            if (params.id) { // si existe el id quere decir que es un update si no un create
                res = await updateProduct(params.id, dataValid)
                setSucces(["Producto modificado con exito"])
            } else {
                res = await createProduct(dataValid)
                setSucces(["Producto creado con exito"])
            }
            if (res.status == 200) navigate("/products") // retornar a productos
        } catch (error) {
            console.error(error)
        }
    })

  return (
    <div className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
        
            <button onClick={ () => navigate("/products")} >
                <IconBack />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{ params.id ? "Editar producto" : "Agregar producto"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
                            <input 
                                id='name'
                                type='text'
                                placeholder="Nombre de producto" 
                                {...register('name', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.name && <Alert message={"El nombre es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Url imagen</label>
                            <input 
                                id='image'
                                type='text'
                                placeholder="Url de la imagen" 
                                {...register('image', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.image && <Alert message={"La imagen es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripcion</label>
                            <textarea
                                id='description'
                                rows="3"
                                placeholder="Escriba aqui la descripción del producto..." 
                                {...register('description', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.description && <Alert message={"La descripcion es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Precio</label>
                            <input 
                                id='price'
                                type='number'
                                placeholder="Precio del producto" 
                                {...register('price', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.price && <Alert message={"El precio es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Tipo</label>
                            <input 
                                id='type' 
                                type='text'
                                placeholder="Tipo del producto" 
                                {...register('type', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.type && <Alert message={"El tipo producto es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="material" className="block text-gray-700 font-bold mb-2">Material</label>
                            <input 
                                id='material'
                                type='text'
                                placeholder="Material del producto" 
                                {...register('material', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.material && <Alert message={"El material es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="floors" className="block text-gray-700 font-bold mb-2">Pisos</label>
                            <input 
                                id='floors'
                                type='Number'
                                placeholder="Pisos" 
                                {...register('floors', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.floors && <Alert message={"El numero de pisos es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="size" className="block text-gray-700 font-bold mb-2">Tamaño</label>
                            <input 
                                id='size'
                                type='text'
                                placeholder="Tamaño" 
                                {...register('size', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.size && <Alert message={"El tamaño es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="bedrooms" className="block text-gray-700 font-bold mb-2">Habitaciones</label>
                            <input 
                                id='bedrooms'
                                type='text'
                                placeholder="Habitaciones" 
                                {...register('bedrooms', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.bedrooms && <Alert message={"La cantidad de habitaciones es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">Estado</label>
                            <select
                                id="state"
                                type="select"
                                {...register('state', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                <option defaultValue={"Seleccione un estado"} disabled>Seleccione un estado</option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                            { errors.state && <Alert message={"El estado del producto es requerido"} color={"bg-red-500"}/> }
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link to={"/products"} className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default ProductFromPage