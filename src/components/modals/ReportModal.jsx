import { IconBack, IconClose, IconSend } from '../../icons/iconsConstants'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '../Alert';
import { Link } from 'react-router-dom'

// Importar libreria para casteao de fechas
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

/**
 * Componente de generación de reportes utilizado por los modulos,
 * Recibe los siguientes parametros:
 * @param {string} title - Título del módulo del reporte
 * @param {Function} reportTask - Función para enviar datos del reporte
 * @param {Function} onCancel - Función para cancelar la creación del reporte
 */
// eslint-disable-next-line react/prop-types
function ReportModal({ title, reportTask, onCancel }) {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, formState: { errors} } = useForm()
    const [errorsMessage, setErrorsMessage] = useState([])
    const [succesMessage, setSuccesMessage] = useState([])
  
    // Enviar datos de la cotizacion
    const onSubmit = handleSubmit(async (data)=> { 
        try {
            const dataValid = {
                ...data,
                start_date: dayjs.utc(data.start_date).startOf('day').format(),
                end_date: dayjs.utc(data.end_date).endOf('day').format()
            }
            const res = await reportTask(dataValid)
            if (res === false) {
                setErrorsMessage(["No se encontraron resultados"])
            } else {
                setSuccesMessage(["Reporte generado con exito"])
            }
        } catch (error) {
            console.error(error)
        }
    })

    // Eliminacion de errores a diligenciar datos no validos en el formulario
    useEffect(() => {
        if (errorsMessage .length > 0 || succesMessage.length > 0) {
            const timer = setTimeout(() => {
                setErrorsMessage([])
                setSuccesMessage([])  
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorsMessage, succesMessage])

  return (
    <>
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <form onSubmit={onSubmit}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4">
                <div className="sm:flex justify-center sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left">
                    <Link onClick={() => onCancel()}>
                        <IconBack />
                    </Link>
                    <h3 className="text-lg leading-6 font-bold text-center">{title}</h3>
                    <div className="mt-2">
                      <p className="text-md text-center mb-2">Elige los parametros para el reporte generar mediante los siguentes campos</p>
                        {
                            errorsMessage && errorsMessage.map((error, i) => (
                                <Alert message={error} color={"bg-red-500"} key={i}/>
                            ))
                        }
                        {
                            succesMessage && succesMessage.map((error, i) => (
                                <Alert message={error} color={"bg-green-500"} key={i}/>
                            ))
                        }
                        <div className="mb-1">
                            <label htmlFor="start_date" className="block text-gray-700 font-bold mb-2">Fecha inicial</label>
                            <input 
                                id="start_date"
                                type='date'
                                {...register('start_date', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                // defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                            />
                            { errors.start_date && <Alert message={"La fecha inicial es requerida"} color={"bg-red-500"}/> }

                            <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">Fecha final</label>
                            <input 
                                id="end_date"
                                type='date'
                                {...register('end_date', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                                defaultValue={dayjs.utc().subtract(5, 'hour').format("YYYY-MM-DD")}
                            />
                            { errors.end_date && <Alert message={"La fecha final es requerida"} color={"bg-red-500"}/> }
                        </div>

                        <div>
                            <legend className="block text-gray-700 font-bold mb-2">Selecciona el Formato</legend>
                            <label className='mr-2 flex sm:inline-block'>
                                <input
                                type="radio"
                                value={"pdf"}
                                defaultChecked
                                {...register("report")}
                                className='mr-1 rounded-md'
                                />
                                Generar en PDF
                            </label>
                            <label>
                                <input
                                type="radio"
                                value={"excel"}
                                {...register("report")}
                                className='mr-1 rounded-md'
                                />
                                Generar en Excel
                            </label>
                            { errors.report && <Alert message={"El tipo de reporte es requerido"} color={"bg-red-500"}/> }
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type='submit'
                    className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 orange font-bold text-white sm:ml-3 sm:w-auto sm:text-sm"
                  >Generar
                  <IconSend />
                </button>
                <Link
                    onClick={() => onCancel()}
                    className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 red font-bold text-white sm:mt-0 sm:w-auto sm:text-sm"
                  >Cancelar
                  <IconClose />
                </Link>
              </div>
            </div>
           
           </form> 
          </div>
        </div>
    </>
  )
}

export default ReportModal