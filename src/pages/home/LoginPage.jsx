import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContex'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import { IconSend } from '../../icons/iconsConstants'

function LoginPage() {

  // Funciones y variables para usar en el formulario
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const { signin, isAuthenticated, errors: signinErrors } = useAuth()

  const naviagate = useNavigate()

  // Enviar datos del usario
  const onSubmit = handleSubmit((data) => {
    signin(data)
  })

  // Si el usario ya esta autenticado retornarlo a una pagina
  useEffect(()=> {
    if (isAuthenticated) naviagate('/products')
  }, [isAuthenticated])

  return (
    <div className="flex justify-center items-center px-800 m-2">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
                {
                    signinErrors && signinErrors.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
              
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        {...register('email', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Correo electrónico" 
                    />
                </div>

                { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        {...register('password', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Password" 
                    />
                </div>

                { errors.password && <Alert message={"El password es requerido"} color={"bg-red-500"}/>}

                <button 
                    type="submit" 
                    className="w-full flex items-center justify-center bg-blue-500 orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1"
                    >Registrarse
                    <IconSend />
                </button>

                <p className="mt-4 text-center text text-gray-500">
                    Si no tienes una cuenta?  {' '}
                 <Link to="/register" className="font-bold leading-6 text-red-600">
                    Registrate
                 </Link>
               </p>
            </form>
        </div>
  )
}

export default LoginPage