import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IconBack, IconClose, IconSave } from "../../../icons/iconsConstants"
import Alert from "../../../components/Alert"
import { useEffect, useState } from "react"
import { useStage } from "../../../context/StageContext"

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import { useActivity } from "../../../context/ActivityContext"
dayjs.extend(utc)

function StageActivitiesFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm()
    const { createActivity, getActivity, updateActivity, setSucces, errors: errorsMessage } = useActivity()
    const [loadingActivity, setLoadingActivity ] = useState(false)

    const navigate = useNavigate()  
    const params = useParams()

    // Recupera el id de etapa y id del proyecto para los botones de volver y cancelar
    const [stage_id, setStage_id] = useState('')
    const [project_id, setProject_id] = useState('')

    // Recuperar etapa 
    const { getStage } = useStage()
     
    // Cargar Etapa de la actividad
    useEffect(() => {
      async function loadStage() {
        if (params.stageId) {
          const stage = await getStage(params.stageId)
          setProject_id(stage.project)
        }
      }
      loadStage()
    })

    // Cargar informacion de la actividad en caso de ser un update
    useEffect(() => {
      async function loadActivity() {
        if (params.id && !loadingActivity) {
          const actvity = await getActivity(params.id)
          setValue('name', actvity.name)
          setValue('responsible', actvity.responsible)
          setValue('objective', actvity.objective)
          setValue('start_date', dayjs.utc(actvity.start_date).format('YYYY-MM-DD'))
          setValue('end_date', dayjs.utc(actvity.end_date).format('YYYY-MM-DD'))
          setValue('observations', actvity.observations)
          setValue('state', actvity.state)
          setValue('stage', actvity.stage_id)

          // setValue('project', stage.project)
          setStage_id(actvity.stage_id) // Guardar id de etapa de la actividad

          // Almacenar id del proyecto
          const stage = await getStage(actvity.stage_id)
          setProject_id(stage.project)

          setLoadingActivity(true) // Cambiar el estado a etapa cargada
        }
      }
      loadActivity()
    })


    // Enviar datos de la actividad
    const onSubmit = handleSubmit(async (data)=> {
      try {
        const dataValid = {
          ...data,
          start_date: data.start_date ? dayjs.utc(data.start_date).format() : dayjs.utc().subtract(5, 'hour').format(),
          end_date: data.end_date ? dayjs.utc(data.end_date).format() : dayjs.utc().subtract(5, 'hour').format(),
        }
        let res = {}
        if (params.id) { // si existe el id quere decir que es un update si no un create
              res = await updateActivity(params.id, dataValid)
              setSucces(["Acividad modificada con exito"])
        } else {
              res = await createActivity(dataValid)
              setSucces(["Acividad creada con exito"])
        }
        if (res.status == 200) navigate(`/project-stage-activities/${dataValid.stage}/${project_id}`) // retornar a estapas del proyecto  
      } catch (error) {
        console.error(error)
      }
    })

  return (
    <main className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
        <Link to={stage_id !== '' ? `/project-stage-activities/${stage_id}/${project_id}`  : `/project-stage-activities/${params.stageId}/${project_id}`}>
            <IconBack />
        </Link>
            <h2 className="text-2xl font-bold mb-6 text-center">{ params.id ? "Editar actividad" : "Agregar actividad"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <input 
                            id='stage'
                            type="text" 
                            value={params.stageId}
                            hidden
                            {...register('stage', { required: true})} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        />
                        
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre de la actividad</label>
                            <input 
                                id="name"
                                type='text'
                                placeholder="Nombre de la actividad" 
                                {...register('name', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.name && <Alert message={"El nombre de la actividad es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="responsible" className="block text-gray-700 font-bold mb-2">Responsable de la acividad</label>
                            <input 
                                id="responsible"
                                type='text'
                                placeholder="Responsabe de la actvidad" 
                                {...register('responsible', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.responsible && <Alert message={"El responsable de la actividad es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="objective" className="block text-gray-700 font-bold mb-2">Objetivo</label>
                            <textarea 
                                id="objective"
                                rows="3"
                                placeholder="Escriba aqui el objetivo de la actividad..." 
                                {...register('objective', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.objective && <Alert message={"El objetivo de la actividad es requerido"} color={"bg-red-500"}/> }
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

                        <div className="mb-1">
                            <label htmlFor="observations" className="block text-gray-700 font-bold mb-2">Observaciones</label>
                            <textarea 
                                id="observations"
                                rows='3' 
                                {...register('observations')} 
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                placeholder="Escriba aqui las observaciones para la actividad...">
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
                                <option value={"Suspendida"}>Suspendida</option>
                                <option value={"Finalizada"}>Finalizada</option>
                            </select>
                            { errors.state && <Alert message={"El estado de la actividad es requerido"} color={"bg-red-500"}/> }
                        </div>

                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link 
                            to={ stage_id !== '' ? `/project-stage-activities/${stage_id}/${project_id}`  : `/project-stage-activities/${params.stageId}/${project_id}`}
                            className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </main>
  )
}

export default StageActivitiesFormPage