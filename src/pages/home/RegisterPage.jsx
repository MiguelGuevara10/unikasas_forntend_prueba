import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContex"
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import { IconSend } from '../../icons/iconsConstants'

function RegisterPage() {

  // Funciones y variables a usar en el formulario
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()  
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const [differentPassword, setDifferentPassword] = useState(false)
  const naviagate = useNavigate()

  // Validar y si ya esta autenticado redireccionar el usuario
  useEffect(()=> {
    if (isAuthenticated) naviagate('/products')
  }, [isAuthenticated])

  // Enviar datos del usuario
  const onSubmit = handleSubmit(async (values) => {
    setDifferentPassword(false)
    if (values.password === values.confirmpassword) {
        delete values.confirmpassword
        signup(values)
    } else {
      setDifferentPassword(true) // Cambiar estado para mostrar que las contraseña y la confirmacion es diferente
    }
  })

  return (
    <div className="flex justify-center items-center px-800 m-2">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
                {
                    registerErrors && registerErrors.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                <div className="mb-2">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input 
                        type="text" 
                        {...register('username', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Nombres y apellidos" 
                    />
                </div>

                { errors.username && <Alert message={"El nombre es requerido"} color={"bg-red-500"}/> }
                
                <div className="mb-2">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        {...register('email', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Correo electrónico" 
                    />
                </div>

                { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}

                <div className="mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        {...register('password', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Password" 
                    />
                </div>

                { errors.password && <Alert message={"El password es requerido"} color={"bg-red-500"}/>}

                <div className="mb-2">
                    <label htmlFor="confirmpassword" className="block text-gray-700 font-bold mb-2">Confirmación de password</label>
                    <input 
                        type="password" 
                        {...register('confirmpassword', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Confirmación de password" 
                    />
                </div>

                { errors.confirmpassword && <Alert message={"La confirmacion del password es requerida"} color={"bg-red-500"}/>}
                { differentPassword && <Alert message={"La confirmacion y el password son diferentes"} color={"bg-red-500"}/>}

                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-blue-500 orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1"
                    >Registrarse
                   <IconSend />  
                </button>

                <p className="mt-4 text-center text text-gray-500">
                    Si ya tienes una cuenta ve a?  {' '}
                 <Link to="/login" className="font-bold leading-6 text-red-600">
                   Login
                 </Link>
               </p>
            </form>
        </div>
  )
}

export default RegisterPage