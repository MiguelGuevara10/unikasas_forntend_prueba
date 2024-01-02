import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconDisguise, IconHome, IconSee, IconSend } from '../../icons/iconsConstants';
import Alert from '../../components/Alert';

function RecoverAccount() {

    // Funciones y variables para usar en el formulario
  const { register, handleSubmit, unregister, formState: { errors } } = useForm()
  
  const { isAuthenticated, recoverAccount, setSucces, setErrors, errors: signinErrors, succes: succesMessage } = useAuth()

  // Visualizar input de pin
  const [showPin, setShowPIn] = useState(false);
  function togglePinVisibility(state) {
    setShowPIn(state)
  }

  // Visualizar div con los inputs de passwords
  const [showPasswordDiv, setShowPasswordDiv] = useState(false);
  function togglePasswordVisibilityDiv(state) {
    setShowPasswordDiv(state)
  }

  const navigate = useNavigate()

  // Visualizar contraseña
  const [differentPassword, setDifferentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  }

  // Cronometro para le usuario de registro del pin enviado al correo eletronico
  const [timeRemaining, setTimeRemaining] = useState(-1)
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000); // Actualizar el tiempo restante cada segundo

      // Limpiar el temporizador al desmontar el componente para evitar fugas de memoria
      return () => clearInterval(timer);
    } else {
        if (timeRemaining === 0) {
            setShowPIn(false)
            unregister('pin')
            setErrors(["El tiempo para el registro del pin ha expirado, generelo nuevamente"])
        }
    }
  }, [timeRemaining])

  // Hallar minutos a pasar al input
  let minutes = Math.floor(timeRemaining / 60)
  let remainingSeconds = timeRemaining % 60
  let result = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

  // Enviar datos del usario
  const onSubmit = handleSubmit(async (data) => {
    try {
        let res = {}
        if (data.email && !data.pin) {
            res = await recoverAccount(data)
            if (res.status === 200) {
                togglePinVisibility(true) // Mostrar input para ingresar pin
                setSucces(["Pin de confirmación enviado al correo eletronico"])
                setTimeRemaining(120) // Iniciar tiempo atras para regstrar pin  
            }
        } else if (data.email && data.pin && !data.password) {
            res = await recoverAccount(data)
            if (res.status === 200) {
                togglePinVisibility(false) // Ocultar input de pin
                togglePasswordVisibilityDiv(true) // Mostrar div de passwords
                setSucces(["Confirmación de pin exitosa ingrese la nueva contraseña" ])
                setTimeRemaining(-1) // Terminar tiempo atras para regstrar pin 
            }
        } else if (data.password) {
            setDifferentPassword(false)
            if (data.password === data.confirmpassword) {
                delete data.confirmpassword
                res = await recoverAccount(data)
                if (res.status === 200) {
                    setSucces(["Cambio de contraseña exitoso, ya puede iniciar sesión con la nueva contraseña" ])
                    navigate("/login")
                } 
            } else {
                setDifferentPassword(true) // Cambiar estado para mostrar que las contraseña y la confirmacion es diferente
            }       
        }
    } catch (error) {
        console.error(error)
    }
    
  })

  // Si el usario ya esta autenticado retornarlo a una pagina
  useEffect(()=> {
    if (isAuthenticated) navigate('/products')
  }, [isAuthenticated])

  return (
    <main className="flex justify-center items-center px-800 m-5">
            
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={"/"}> 
                    <IconHome />
                </Link>
                <h2 className="text-2xl font-bold mb-6 text-center">Recuperación de contraseña</h2>
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
                        placeholder="Ingrese el email para enviar un pin de confirmación" 
                    />
                    { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/>}
                </div>

                { showPin &&
                    <div className="mb-4">
                        <label htmlFor="pin" className="block text-gray-700 font-bold mb-2">Ingrese el pin - <span className='text-red-600'>{result ? result : ""}</span></label>
                        <input 
                            id='pin'
                            type="number" 
                            {...register('pin', { required: true})} 
                            autoFocus
                            disabled={timeRemaining <= 0}
                            className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            placeholder="Ingrese el pin de aaceso enviado al email" 
                        />
                        { errors.pin && <Alert message={"El pin de acceso es requerido"} color={"bg-red-500"}/>}
                    </div>
                }

                {
                    showPasswordDiv &&
                    <>
                    <div className="mb-2 relative">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input 
                        id="password"
                        type={showPassword ? 'text' : 'password'} 
                        {...register('password', { required: true})} 
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Ingrese el nuevo password" 
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
                </>
                }

                { differentPassword && <Alert message={"La confirmacion y el password son diferentes"} color={"bg-red-500"}/>}

                <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1">
                            Enviar
                            <IconSend />
                        </button>
                </div>

                <p className="mt-4 text-center text text-gray-500">
                    Ya recuperaste la cuenta?  {' '}
                 <Link to="/login" className="font-bold leading-6 text-red-600 hover:text-red-500">
                    Iniciar sesión
                 </Link>
               </p>
            </form>
        </main>
  )
}

export default RecoverAccount