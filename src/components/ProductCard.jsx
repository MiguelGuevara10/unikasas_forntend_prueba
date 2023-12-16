import { Link } from "react-router-dom"
import { useProduct } from "../context/ProductContext"
import Modal from "./Modal"
import { useState } from "react";
import { IconDelete, IconEdit, IconQuotes } from "../icons/iconsConstants"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function ProductCard({ product, options }) {

    // Funciones y variables a usar en la pagina
    const { deleteProdct } = useProduct()
    const [open, setOpen] = useState(false)

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open);
    };

  return (
        <div className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
            {open && <Modal onConfirm={deleteProdct} id={product._id} onCancel={handleClick}/>}

            <img 
                src={product.image}  
                alt="Imagen del producto" 
                className="card-img-top rounded-md w-auto w-120 h-60 object-cover mx-auto"
                onError={(e) => {
                    e.target.onerror = null
                    // e.target.src = 'URL_DE_LA_IMAGEN_ALTERNATIVA'
                    e.target.alt = 'Imagen no disponible'
                }}
            />
                    
            <div className="card-body text-center my-4">
                <div className="border border-gray-300 rounded p-4 mb-4">
                    <h2 className="font-bold text-lg mb-2"><b>Nombre: </b>{product.name}</h2>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <p><b>Descripción: </b>{product.description}</p>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Tipo: </b>{product.type}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Material: </b>{product.material}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Tamaño: </b>{product.size}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Habitaciones: </b>{product.bedrooms}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    {options && 
                    <>
                        <span><b>Estado: </b>{ product.state ? "Activo" : "Inactivo" }</span>
                        <hr className="border-t border-gray-300 m-2"></hr>

                        <p><b>Fecha creación: </b>{ dayjs(product.createAt).utc().format("DD/MM/YYYY") }</p>
                        <span><b>Fecha actualización: </b>{ dayjs(product.updateAt).utc().format("DD/MM/YYYY") }</span>
                        <hr className="border-t border-gray-300 m-2"></hr>
                    </>
                    }

                    <span><b>Precio $: </b>{product.price.toLocaleString()}</span>
                </div>
                    
                <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <button className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        <Link to={`/add-quote/product/${product._id}`}>Cotizar</Link>
                        <IconQuotes />
                    </button>

                    {options && 
                        <>
                        <button className="flex items-center green text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            <Link to={`/add-product/${product._id}`}>Editar</Link>
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
                        </>
                        } 
                  </div>
                                 
                </div>
            </div>
  )
}

export default ProductCard