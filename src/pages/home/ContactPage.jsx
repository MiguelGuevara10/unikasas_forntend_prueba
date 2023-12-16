import { useForm } from "react-hook-form"
import { getContactme } from "../../api/home"
import { useEffect, useState } from "react"
import Alert from "../../components/Alert"
import { IconClock, IconInfo, IconSend, IconService } from "../../icons/iconsConstants"

function ContactPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [errorsMessage, setErrorsMessage] = useState([])
    const [succesMessage, setSuccesMessage] = useState([])

    // Enviar mensaje de contacto
    const onSubmit = handleSubmit(async (data)=> {
        try {
            const res = await getContactme(data)
            setSuccesMessage(res.data.message)
            reset() // Limpiar el formulario una vez se guarden los datos
        } catch (error) {
            console.error(error.response.data)
            setErrorsMessage(error.response.data)
        }
    })

    // Eliminacion de errores a diligenciar datos no validos en el formulario
    useEffect(() => {
        if (errorsMessage.length > 0 || succesMessage.length > 0) {
            const timer = setTimeout(() => {
                setErrorsMessage([])
                setSuccesMessage([])
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorsMessage, succesMessage])

  return (
    <div className="px-1 py-1 sm:px-6 lg:col-span-3 lg:px-8">
        <h1 className="text-center text-2xl font-bold mb-4 my-2">Contactanos</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconInfo />

                <h2 className="text-lg font-bold mb-2">Información de contacto</h2>
                <p>Dirección: Calle X, Ciudad Y, País Z</p>
                <p>Teléfono: +123456789</p>
                <p>Email: info@empresa.com</p>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconClock />

                <h2 className="text-lg font-bold mb-2">Horario de atención</h2>
                <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábados: 10:00 AM - 2:00 PM</p>
                <p>Domingos: Cerrado</p>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconService />

                <h2 className="text-lg font-bold mb-2">Nuestros Servicios</h2>
                <ul className="list-disc list-inside">
                    <li>Servicio 1</li>
                    <li>Servicio 2</li>
                    <li>Servicio 3</li>
                    {/* Agrega más servicios según sea necesario */}
                </ul>
            </div>    
        </div>

        <div className="flex justify-center items-center h-screen px-800">
            
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Envianos un mensaje</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                {
                    succesMessage && succesMessage.map((success, i) => (
                        <Alert message={success} color={"bg-green-500"} key={i}/>
                    ))
                }
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input 
                        type="text" 
                        {...register('name', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Nombres y apellidos" 
                    />
                </div>

                { errors.name && <Alert message={"El nombre es requerido"} color={"bg-red-500"}/> }
                
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                    <input 
                        type="email" 
                        {...register('email', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Correo Electrónico" 
                    />
                </div>

                { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}

                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje</label>
                    <textarea 
                        rows='3' 
                        {...register('message', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Escribe tu mensaje aquí..">
                    </textarea>
                </div>

                { errors.message && <Alert message={"El mensaje es requerido"} color={"bg-red-500"}/> }

                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-blue-500 orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1"
                    >Enviar
                    <IconSend />
                </button>
            </form>
        </div>
        
    </div>
  )
}

export default ContactPage