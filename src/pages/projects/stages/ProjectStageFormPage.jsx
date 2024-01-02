import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconBack, IconClose, IconSave } from '../../../icons/iconsConstants'
import Alert from '../../../components/Alert'
import { useStage } from '../../../context/StageContext'
import { useEffect, useState } from 'react'

function ProjectStageFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm()
    const { createStage, getStage, updateStage, setSucces, errors: errorsMessage } = useStage()
    const [loadingStage, setLoadingStage] = useState(false)
    
    // Recupera product id para los votones de volver y cancelar
    const [product_id, setProduct_id] = useState('')

    const navigate = useNavigate()  
    const params = useParams()

    // Cargar informacion de la etapa en caso de ser un update
    useEffect(() => {
      async function loadStage() {
        if (params.id && !loadingStage) {
          const stage = await getStage(params.id)
          setValue('name', stage.name)
          setValue('description', stage.description)
          setValue('project', stage.project)

          setLoadingStage(true) // Cambiar el estado a etapa cargada
          setProduct_id(stage.project) // Almacenar el id del proyecto
        }
      }
      loadStage()
    })

    // Enviar datos de la etapa 
    const onSubmit = handleSubmit(async (data)=> {
        try {
            let res = {}
            if (params.id) { // si existe el id quere decir que es un update si no un create
                res = await updateStage(params.id, data)
                setSucces(["Etapa modificada con exito"])
            } else {
                res = await createStage(data)
                setSucces(["Etapa creada con exito"])
            }
            if (res.status == 200) navigate(`/project-stages/${data.project}`) // retornar a estapas del proyecto
        } catch (error) {
            console.error(error)
        }
    })

  return (
    <main className="flex justify-center items-center px-800 m-2">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={product_id !== '' ? `/project-stages/${product_id}`  : `/project-stages/${params.projectId}`}>
                    <IconBack />
                </Link>
                <h2 className="text-2xl font-bold mb-4 text-center">{ params.id ? "Editar etapa" : "Agregar etapa"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <input 
                    id='project'
                    type="text" 
                    value={params.projectId}
                    hidden
                    {...register('project', { required: true})} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2" 
                />

                <div className="mb-2">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre de etapa</label>
                    <input 
                        id='name'
                        type="text" 
                        {...register('name', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Nombre de la etapa" 
                    />
                    { errors.name && <Alert message={"El nombre de la etapa es requerido"} color={"bg-red-500"}/> }
                </div>
                
                <div className="mb-2">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea 
                        id='description'
                        rows="3" 
                        {...register('description', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Descripcion de la etapa" 
                    />
                    { errors.description && <Alert message={"La descripción de la etapa es requerida"} color={"bg-red-500"}/>}
                </div>

                <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-row lg:flex-row">
                    <button 
                      type='submit'
                      className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Guardar
                        <IconSave />
                    </button>

                    <Link 
                        to={ product_id !== '' ? `/project-stages/${product_id}` : `/project-stages/${params.projectId}`}
                        className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Cancelar                           
                        <IconClose />
                    </Link> 
            </div>

            </form>
        </main>
  )
}

export default ProjectStageFormPage