/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { IconDelete, IconEdit } from "../../icons/iconsConstants"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useRole } from "../../context/RolContex"
import { useState } from "react"
import Modal from "../modals/Modal"
dayjs.extend(utc)

/**
 * Componente card de tareas del usuario,
 * recibe los siguientes parametros:
 * @param {Object} role - Objeto con los campos a mostrar 
 */
// eslint-disable-next-line react/prop-types
function RoleCard({ role }) {

    // Funciones y variables a usar en la pagina
    const { deleteRole } = useRole()
    const [open, setOpen] = useState(false)

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open)
    }

  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {open && <Modal onConfirm={deleteRole} id={role._id} onCancel={handleClick}/>}
            
        <div className="card-body text-center my-1">
            <div className="border border-gray-300 rounded p-2 mb-3">
                <h2 className="font-bold text-lg mb-2"><b>Nombre del rol: </b>{role.name}</h2>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <p><b>Privilegios: </b>{role.privileges.join(', ')}</p>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha de creación: </b>{dayjs(role.createdAt).utc().format("DD/MM/YYYY")}</span>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Ultima fecha de modificación: </b>{dayjs(role.updadtedAt).utc().format("DD/MM/YYYY")}</span>
            </div>
                
            <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <Link to={`/add-role/${role._id}`} className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Editar
                        <IconEdit />
                    </Link>

                    <button 
                        onClick={() => { 
                            handleClick()
                        }}
                        className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Eliminar
                        <IconDelete />
                    </button> 
            </div>
                            
        </div>
    </div>
  )
}

export default RoleCard