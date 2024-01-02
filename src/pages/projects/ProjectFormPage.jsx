import { useForm } from "react-hook-form"
import Alert from "../../components/Alert"
import { IconBack, IconClose, IconSave } from "../../icons/iconsConstants"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useQuote } from "../../context/QuoteContext"
import { useProject } from "../../context/ProjectContext"

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

function ProjectFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm()
    const { createProject, getProject, updateProject, setSucces, errors: errorsMessage } = useProject()
    const [loadingProject, setLoadingProject] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    // Traer las cotizaciones
    const { quotes, getQuotes } = useQuote()

    useEffect(() => {
        getQuotes()
    }, [])

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

    // Cargar informacion del proyecto en caso de ser un update
    useEffect(() => {
        async function loadProject() {
            if (params.id && !loadingProject) {
                const project = await getProject(params.id)
                setValue('name', project.name)
                setValue('responsible', project.responsible)
                setValue('estimated_cost', project.estimated_cost)
                setValue('final_cost', project.final_cost)
                // setValue('city', project.city)
                setValue('address', project.address)
                setValue('start_date', dayjs.utc(project.start_date).format('YYYY-MM-DD'))
                setValue('end_date', dayjs.utc(project.end_date).format('YYYY-MM-DD'))
                // setValue('quote', project.quote)
                setValue('description', project.description)
                setValue('state', project.state)
                
                // Asignar ciudad si no se encuentra en la lista select
                // TODO VERIFICAR BIEN LA LOGICA AQUI
                if (otherCity === "") {
                    setOtherCity(project.city)
                }
                setIsOtherCity(true)

                setLoadingProject(true) // Cabiar el estado del proyecto cargado
            }
        }
        loadProject()
    })

    // Enviar datos del proyecto
    const onSubmit = handleSubmit(async (data)=> {
        try {
            const dataValid = {
                ...data,
                start_date: data.start_date ? dayjs.utc(data.start_date).format() : dayjs.utc().subtract(5, 'hour').format(),
                end_date: data.end_date ? dayjs.utc(data.end_date).format() : dayjs.utc().subtract(5, 'hour').format(),
                estimated_cost: parseInt(data.estimated_cost),
                final_cost: data.final_cost ? parseInt(data.final_cost) : 0
            }
            let res = {}
            if (params.id) { // si existe el id quere decir que es un update si no un create
                res = await updateProject(params.id, dataValid)
                setSucces(["Proyecto modificado con exito"])
            } else {
                res = await createProject(dataValid)
                setSucces(["Proyecto creado con exito"])
            }
            if (res.status == 200) navigate("/projects") // retornar a projectos
        } catch (error) {
           console.error(error) 
        }
    })


  return (
    <main className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <button onClick={ () => navigate("/projects")} >
                <IconBack />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{ params.id ? "Editar proyecto" : "Agregar proyecto"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                {quotes && quotes.filter(quote => quote.state === "completada").length === 0 && !params.id &&
                    <Alert
                        message={"No hay cotizaciones con estado completada para iniciar un proyecto nuevo"}
                        color={"bg-red-500"}
                        key={0}
                    />
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre del proyecto</label>
                            <input 
                                id="name"
                                type='text'
                                placeholder="Nombre del proyecto" 
                                {...register('name', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.name && <Alert message={"El nombre del proyecto es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="responsible" className="block text-gray-700 font-bold mb-2">Encargado del proyecto</label>
                            <input 
                                id="responsible"
                                type='text'
                                placeholder="Nombre del encargado del proyecto" 
                                {...register('responsible', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.responsible && <Alert message={"La resonsable del proyecto es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="estimated_cost" className="block text-gray-700 font-bold mb-2">Costo estimado</label>
                            <input 
                                id="estimated_cost"
                                type='number'
                                placeholder="Costo estimado del proyecto" 
                                {...register('estimated_cost', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.estimated_cost && <Alert message={"El costo estimado es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="final_cost" className="block text-gray-700 font-bold mb-2">Costo final</label>
                            <input 
                                id="final_cost"
                                type='number'
                                placeholder="Costo estimado del proyecto" 
                                {...register('final_cost')}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            {/* { errors.final_cost && <Alert message={"El costo estimado es requerido"} color={"bg-red-500"}/> } */}
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
                            { errors.city && <Alert message={"La ciudad del proyecto es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Dirrección del proyecto</label>
                            <input 
                                id="address"
                                type='text'
                                placeholder="Ingrese la dirección del proyecto" 
                                {...register('address', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.address && <Alert message={"La direción del proyecto es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="start_date" className="block text-gray-700 font-bold mb-2">Fecha de inicio</label>
                            <input 
                                id="start_date"
                                type='date'
                                {...register('start_date', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                            />
                            { errors.start_date && <Alert message={"La fecha de inicio es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">Fecha de finalización</label>
                            <input 
                                id="end_date"
                                type='date'
                                {...register('end_date', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                // defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                            />
                            { errors.end_date && <Alert message={"La fecha de finalización es requerida"} color={"bg-red-500"}/> }
                        </div>
                        {
                            !params.id && 
                            <div className="mb-1">
                                <label htmlFor="quote" className="block text-gray-700 font-bold mb-2">Seleccione la cotización del proyecto</label>
                                <select
                                    id="quote"
                                    type="select"
                                    {...register('quote', { required: true})}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                    <option defaultValue={"Seleccione una cotización"} disabled>Seleccione una cotización</option>
                                    { quotes && quotes.map((quote, i) => (
                                        quote.state === 'completada' && <option value={quote._id} key={i}>{quote.product.name} - {quote.name} - {dayjs.utc(quote.date).format('YYYY-MM-DD')}</option>
                                    ))
                                    }
                                </select>
                                { errors.quote && <Alert message={"La cotización a partir de la cual se generara el proyecto es requerida"} color={"bg-red-500"}/> }
                            </div>
                        }
                        

                        <div className="mb-1">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción del proyecto</label>
                            <textarea 
                                id="description"
                                rows='3' 
                                {...register('description')} 
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                placeholder="Escriba una descripción para el proyecto ..">
                            </textarea>
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
                                <option value={"En ejecución"}>En ejecución</option>
                                <option value={"Suspendido"}>Suspendido</option>
                                <option value={"Finalizado"}>Finalizado</option>
                            </select>
                            { errors.state && <Alert message={"El estado del proyecto es requerido"} color={"bg-red-500"}/> }
                        </div>

                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link to={"/projects"} className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </main>
  )
}

export default ProjectFormPage