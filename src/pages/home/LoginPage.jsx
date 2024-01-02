import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContex'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import { IconDisguise, IconHome, IconSee, IconSend } from '../../icons/iconsConstants'

function LoginPage() {

  // Funciones y variables para usar en el formulario
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const { signin, isAuthenticated, succes: succesMessage, errors: signinErrors } = useAuth()

  // Visualizar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  }

  const naviagate = useNavigate()

  // Enviar datos del usario
  const onSubmit = handleSubmit(async (data) => {
    try {
        await signin(data)
    } catch (error) {
        console.error(error)
    }
  })

  // Si el usario ya esta autenticado retornarlo a una pagina
  useEffect(()=> {
    if (isAuthenticated) naviagate('/products')
  }, [isAuthenticated])

  return (
    <main className="flex justify-center items-center px-800 m-5">
            
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={"/"}> 
                    <IconHome />
                </Link>
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
                {
                    signinErrors && signinErrors.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                {
                    succesMessage && succesMessage.map((success, i) => (
                        <Alert message={success} color={"bg-green-500"} key={i}/>
                    ))
                }
              
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        id='email'
                        type="email" 
                        {...register('email', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Correo electrónico" 
                    />
                    { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}
                </div>

                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input 
                        id='password'
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

                <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                            Ingresar
                            <IconSend />
                        </button>
                </div>

                <p className="mt-4 text-center text text-gray-500">
                    Si no tienes una cuenta?  {' '}
                 <Link to="/register" className="font-bold leading-6 text-red-600 hover:text-red-500">
                    Registrarse
                 </Link>
               </p>

               <p className="mt-0 text-center text text-gray-500">
                    Olvidaste la contraseña?  {' '}
                 <Link to="/recover-account" className="font-bold leading-6 text-red-600 hover:text-red-500">
                    Recuperar
                 </Link>
               </p>
            </form>
        </main>
  )
}

export default LoginPage