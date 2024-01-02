/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Modal from "../modals/Modal"
import { IconDelete, IconEdit } from "../../icons/iconsConstants"
import { useState } from "react"
import { useUser } from "../../context/UserContext"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAuth } from "../../context/AuthContex"
dayjs.extend(utc)

/**
 * Componente card de tareas del usuario,
 * recibe los siguientes parametros:
 * @param {Object} user - Objeto con los campos a mostrar 
 */
// eslint-disable-next-line react/prop-types
function UserCard({ user }) {

    // Funciones y variables a usar en la pagina
    const { deleteUser } = useUser()
    const [open, setOpen] = useState(false)

    // Usuario registado en el sistema
    const { user: userSinstem } = useAuth()

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open);
    }

  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {open && <Modal onConfirm={deleteUser} id={user._id} onCancel={handleClick}/>}
            
        <div className="card-body text-center my-1">
            <div className="border border-gray-300 rounded p-2 mb-3">
                <h2 className="font-bold text-lg mb-2"><b>Nombre: </b>{user.username}</h2>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span className="break-words"><b>Email: </b>{user.email}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Rol: </b>{user.role.name}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Privilegios: </b>{user.role.privileges.join(', ')}</span> 
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Estado: </b>{user.state === true ? "Activo" : "Inactivo" }</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha de creación: </b>{dayjs(user.createdAt).utc().format("DD/MM/YYYY")}</span>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Ultima modificacón: </b>{dayjs(user.updatedAt).utc().format("DD/MM/YYYY")}</span>
            </div>
                
            <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                { userSinstem.role.privileges && userSinstem.role.privileges.includes('Modificar') &&    
                    <Link to={`/add-user/${user._id}`} className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                        Editar
                        <IconEdit />
                    </Link>
                }
                { userSinstem.role.privileges && userSinstem.role.privileges.includes('Eliminar') && 
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

export default UserCard