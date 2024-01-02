/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import Modal from "../modals/Modal"
import { useState } from "react";
import { IconDelete, IconEdit, IconQuotes } from "../../icons/iconsConstants"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAuth } from "../../context/AuthContex";
dayjs.extend(utc)

/**
 * Componente card de productos,
 * recibe los siguientes parametros:
 * @param {Object} product - Objeto con los campos a mostrar 
 * @param {Boolean} product - Opcion para no visualizar opciones en el catalogo del cliente 
 */
// eslint-disable-next-line react/prop-types
function ProductCard({ product, options }) {

    // Funciones y variables a usar en la pagina
    const { deleteProdct } = useProduct()
    const [open, setOpen] = useState(false)

    // Usuario registado en el sistema
    const { user } = useAuth()

    // Abrir y cerrar modal
    const handleClick = () => {
      setOpen(!open)
    }

  return (
    <article className="card max-w-md w-full p-8 items-center justify-center border-2 border-solid shadow-lg hover:border-black hover:shadow-xl rounded-md mb-2">
            {open && <Modal onConfirm={deleteProdct} id={product._id} onCancel={handleClick}/>}

            <img 
                src={product.image}  
                alt="Imagen del producto" 
                className="card-img-top rounded-md w-auto w-120 h-60 object-cover mx-auto"
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null
                    // e.target.src = 'URL_DE_LA_IMAGEN_ALTERNATIVA'
                    e.target.alt = 'Imagen no disponible'
                }}
            />
                    
            <div className="card-body text-center my-1 mt-2">
                <div className="border border-gray-300 rounded p-2 mb-3">
                    <h2 className="font-bold text-lg mb-2"><b>Nombre: </b>{product.name}</h2>
                    <hr className="border-t-4 border-[green] m-2 rounded-md"></hr>
                
                    <span><b>Descripción: </b>{product.description}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Tipo: </b>{product.type}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Material: </b>{product.material}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Tamaño: </b>{product.size}</span>
                    <hr className="border-t border-gray-300 m-2"></hr>

                    <span><b>Habitaciones: </b>{product.bedrooms}</span>
                    <hr 
                        className={`border-t  m-2 ${options ? 'border-gray-300' : 'border-t-4 border-[green] rounded-md'}`}
                    ></hr>

                    {options && 
                    <>
                        <span><b>Estado: </b>{ product.state ? "Activo" : "Inactivo" }</span>
                        <hr className="border-t border-gray-300 m-2"></hr>

                        <span><b>Fecha creación: </b>{ dayjs(product.createAt).utc().format("DD/MM/YYYY") }</span>
                        <hr className="border-t border-gray-300 m-2"></hr>
                        
                        <span><b>Ultima modificación: </b>{ dayjs(product.updateAt).utc().format("DD/MM/YYYY") }</span>
                        <hr className="border-t-4 border-[green] rounded-md m-2"></hr>
                    </>
                    }

                    <span><b>Precio $: </b>{product.price.toLocaleString()}</span>
                </div>
                    
                <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row">
                    <Link to={`/add-quote/product/${product._id}`} className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                        Cotizar
                        <IconQuotes />
                    </Link>

                    {options && 
                        <>
                        { user.role.privileges && user.role.privileges.includes('Modificar') && 
                            <Link to={`/add-product/${product._id}`} className="flex items-center green text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                                Editar
                                <IconEdit /> 
                            </Link>
                        }
                        {
                            user.role.privileges && user.role.privileges.includes('Eliminar') &&
                            <button 
                                onClick={() => { 
                                    handleClick()
                                }}
                                className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                                    Eliminar
                                <IconDelete />
                            </button>
                        }
                        </>
                        } 
                </div>
                                 
            </div>
    </article>
  )
}

export default ProductCard