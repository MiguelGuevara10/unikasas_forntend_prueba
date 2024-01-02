import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContex"
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import { IconDisguise, IconHome, IconSee, IconSend } from '../../icons/iconsConstants'

function RegisterPage() {

  // Funciones y variables a usar en el formulario
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()  
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()
  const [differentPassword, setDifferentPassword] = useState(false)
  const naviagate = useNavigate()

  // Visualizar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  }

  // Validar y si ya esta autenticado redireccionar el usuario
  useEffect(()=> {
    if (isAuthenticated) naviagate('/products')
  }, [isAuthenticated])

  // Enviar datos del usuario
  const onSubmit = handleSubmit(async (values) => {
    try {
        setDifferentPassword(false)
        if (values.password === values.confirmpassword) {
            delete values.confirmpassword
            signup(values)
        } else {
        setDifferentPassword(true) // Cambiar estado para mostrar que las contraseña y la confirmacion es diferente
        }
    } catch (error) {
        console.error(error)
    }   
  })

  return (
    <main className="flex justify-center items-center px-800 m-2">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={"/"}> 
                    <IconHome />
                </Link>
                <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
                {
                    registerErrors && registerErrors.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                <div className="mb-2">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input 
                        id='username'
                        type="text" 
                        {...register('username', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Nombres y apellidos" 
                    />
                    { errors.username && <Alert message={"El nombre es requerido"} color={"bg-red-500"}/> }
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        id='email'
                        type="email" 
                        {...register('email', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Correo electrónico" 
                    />
                    { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}
                </div>

                <div className="mb-2 relative">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input 
                        id="password"
                        type={showPassword ? 'text' : 'password'} 
                        {...register('password', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Password" 
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-3 right-0 flex items-end pr-3 focus:outline-none"
                        >
                        {showPassword ? ( // icono con el ojo cerrado
                                <IconDisguise />
                            ) : ( // icono co el ojo abierto
                                <IconSee />  
                        )}
                    </button>
                    { errors.password && <Alert message={"El password es requerido"} color={"bg-red-500"}/>}
                </div>

                <div className="mb-2 relative">
                    <label htmlFor="confirmpassword" className="block text-gray-700 font-bold mb-2">Confirmación de password</label>
                    <input 
                        id='confirmpassword'
                        type={showPassword ? 'text' : 'password'} 
                        {...register('confirmpassword', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Confirmación de password" 
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-3 right-0 flex items-end pr-3 focus:outline-none"
                        >
                        {showPassword ? ( // icono con el ojo cerrado
                                <IconDisguise />
                            ) : ( // icono co el ojo abierto
                                <IconSee />  
                        )}
                    </button>
                    { errors.confirmpassword && <Alert message={"La confirmacion del password es requerida"} color={"bg-red-500"}/>}
                </div>

                { differentPassword && <Alert message={"La confirmacion y el password son diferentes"} color={"bg-red-500"}/>}

                <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                            Registrarse
                            <IconSend />
                        </button>
                </div>

                <p className="mt-4 text-center text text-gray-500">
                    Si ya tienes una cuenta?  {' '}
                 <Link to="/login" className="font-bold leading-6 text-red-600 hover:text-red-500">
                   Inicia sesión
                 </Link>
               </p>
            </form>
        </main>
  )
}

export default RegisterPage