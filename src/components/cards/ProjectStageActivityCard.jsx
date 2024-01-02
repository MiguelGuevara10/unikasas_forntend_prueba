/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { IconDelete, IconEdit } from "../../icons/iconsConstants"
import { useState } from "react"
import Modal from "../modals/Modal"
import { useActivity } from "../../context/ActivityContext"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAuth } from "../../context/AuthContex"
dayjs.extend(utc)

/**
 * Componente card de actividades de una etapa de proyecto,
 * recibe los siguientes parametros:
 * @param {Object} activity - Objeto con los campos a mostrar 
 */
// eslint-disable-next-line react/prop-types
function ProjectStageActivityCard({ activity }) {

    // Funciones y variables a usar en la pagina
    const { deleteActivity } = useActivity()
    const [open, setOpen] = useState(false)

    // Usuario registado en el sistema
    const { user } = useAuth()

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open)
    }
    
  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {open && <Modal onConfirm={deleteActivity} id={activity._id} onCancel={handleClick}/>}
            
        <div className="card-body text-center my-1">
            <div className="border border-gray-300 rounded p-2 mb-3">
                <h2 className="font-bold text-lg mb-2"><b>Nombre de la actividad: </b>{activity.name}</h2>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span className="break-words"><b>Responsabe: </b>{activity.responsible}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span className="break-words"><b>Objetivo: </b>{activity.objetive}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha de inicio: </b>{dayjs(activity.start_date).utc().format("DD/MM/YYYY")}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha fin: </b>{dayjs(activity.end_date).utc().format("DD/MM/YYYY")}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span className="break-words"><b>Observasiones: </b>{activity.observations}</span>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span className="break-words"><b>Estado: </b>{activity.state}</span>
            
            </div>
                
            <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                { user.role.privileges && user.role.privileges.includes('Modificar') &&
                    <Link to={`/add-activities/${activity._id}`} className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                        Editar
                        <IconEdit />
                    </Link>
                }

                { user.role.privileges && user.role.privileges.includes('Eliminar') &&
                    <button 
                        onClick={() => { 
                            handleClick()
                        }}
                        className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Eliminar
                        <IconDelete />
                    </button> 
                }
            </div>
                            
        </div>
    </div>
  )
}

export default ProjectStageActivityCard