import { useTask } from "../context/TaskContext"
import { Link } from "react-router-dom"
import { useState } from "react"
import Modal from "./Modal"
import { IconDelete, IconEdit } from "../icons/iconsConstants"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskCard({ task }) {

    const { deleteTask } = useTask()
    const [open, setOpen] = useState(false)

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open);
    };

  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {open && <Modal onConfirm={deleteTask} id={task._id} onCancel={handleClick}/>}
            
        <div className="card-body text-center my-4">
            <div className="border border-gray-300 rounded p-4 mb-4">
                <h2 className="font-bold text-lg mb-2"><b>Titulo: </b>{task.title}</h2>
                <hr className="border-t border-gray-300 m-2"></hr>

                <p><b>Descripción: </b>{task.description}</p>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha: </b>{dayjs(task.date).utc().format("DD/MM/YYYY")}</span>
            </div>
                
            <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <button className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        <Link to={`/add-task/${task._id}`}>Editar</Link>
                        <IconEdit />
                    </button>

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

export default TaskCard