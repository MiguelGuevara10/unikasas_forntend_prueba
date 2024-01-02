/* eslint-disable react/prop-types */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

/**
 * Componente card de contactos,
 * recibe los siguientes parametros:
 * @param {Object} quote - Objeto con los campos a mostrar 
 */
// eslint-disable-next-line react/prop-types
function ContactPeopleCard({ contact }) {
  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {/* {open && <Modal onConfirm={deleteTask} id={task._id} onCancel={handleClick}/>} */}
            
        <div className="card-body text-center my-1">
            <div className="border border-gray-300 rounded p-2 mb-3">
                <h2 className="font-bold text-lg mb-2"><b>Nombre: </b>{contact.name}</h2>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Email: </b>{contact.email}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Telefono: </b>{contact.phone}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Email: </b>{contact.email}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Mensaje: </b>{contact.message}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Consentimiento: </b>{contact.consent === true ? "Acepto la recolección de datos personales": "No acepto la recolección de sus datos"}</span>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Fecha de envio: </b>{dayjs(contact.createdAt).utc().format("DD/MM/YYYY")}</span>
            </div>
                
            {/* <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <Link to={`/add-task/${task._id}`} className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
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
            </div> */}
                            
        </div>
    </div>
  )
}

export default ContactPeopleCard