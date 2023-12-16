import { Link } from "react-router-dom"
import { IconDelete, IconEdit, IconSend } from "../icons/iconsConstants"
import { useQuote } from "../context/QuoteContext"
import Modal from "./Modal"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useState } from "react"
dayjs.extend(utc)

function QuoteCard({ quote }) {

    const { deleteQuote } = useQuote()
    const [open, setOpen] = useState(false)

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open);
    }

  return (
    <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
        {open && <Modal onConfirm={deleteQuote} id={quote._id} onCancel={handleClick}/>}
            
        <div className="card-body text-center my-4">
            <div className="border border-gray-300 rounded p-4 mb-4">
                <h2 className="font-bold text-lg mb-2"><b>Producto cotizado: </b>{quote.product.name}</h2>
                <hr className="border-t border-gray-300 m-2"></hr>

                <p><b>Nombre cotizante: </b>{quote.name}</p>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Email: </b>{quote.email}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Telefono: </b>{quote.phone}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Ciudad: </b>{quote.city}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Ubicación: </b>{quote.location}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Comentarios: </b>{quote.comments}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Estado: </b>{quote.state}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha: </b>{dayjs(quote.date).utc().format("DD/MM/YYYY")}</span>
                
            </div>
                
            <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <button className="flex items-center green text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        <Link to={`/add-quote/${quote._id}`}>Editar</Link>
                        <IconEdit />
                    </button>

                    <button className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        <Link to={`/quote-reply/${quote._id}`}>Responder</Link>
                        <IconSend />
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

export default QuoteCard