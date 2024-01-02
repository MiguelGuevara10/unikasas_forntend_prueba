import { useForm } from 'react-hook-form'
import { IconBack, IconClose, IconDisguise, IconSave, IconSee } from '../../icons/iconsConstants'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import { useUser } from '../../context/UserContext'
import { useRole } from '../../context/RolContex'
import { useAuth } from '../../context/AuthContex'

function UserFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [differentPassword, setDifferentPassword] = useState(false)
    const { getUser, createUser, updateUser, setSucces, errors: errorsMessage } = useUser()
    const [loadingUser, setLoadingUser] = useState(false)

    // Cargar roles
    const { roles, getRoles } = useRole()
    useEffect(() => {
        getRoles()
    }, [])

    const navigate = useNavigate()
    const params = useParams()

    // Usuario registado en el sistema
    const { user } = useAuth()

    // Cargar informacion del usuario en caso de ser un update
    useEffect(() => {
        async function loadUser() {
        if (params.id && !loadingUser) {
            const user = await getUser(params.id)
            setValue('username', user.username)
            setValue('email', user.email)
            // TODO No se permite visualizar el password por seguridad
            // setValue('password', 'Ingresa nuevo password - actual oculto')
            // setValue('confirmpassword', 'Ingresa nuevo password - actual oculto')
            setValue('role', user.role._id)
            setValue('state', user.state)
        
            setLoadingUser(true) // Cabiar el estado a tarea cargada
        }
        }
        loadUser()
    })

    // Visualizar contraseña
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    // Enviar datos del usuario
    const onSubmit = handleSubmit(async (values)=> {
        try {
            setDifferentPassword(false)
            if (values.password === values.confirmpassword) {
                delete values.confirmpassword
                let dataValid = {}
                if (values.state === 'true' || values.state === 'false') {
                    dataValid = {
                        ...values,
                        state: values.state === 'true',
                    }
                } else {
                    dataValid = values
                }
                let res = {}
                if (params.id) { // si existe el id quere decir que es un update si no un create
                    res = await updateUser(params.id, dataValid)
                    setSucces(["Usuario modificado con exito"])
                } else {
                    res = await createUser(dataValid)
                    setSucces(["Usuario creado con exito"])
                }
                if (res.status == 200) navigate("/users") // retornar a productos
            } else {
                setDifferentPassword(true) // Cambiar estado para mostrar que las contraseña y la confirmacion es diferente
            }
        } catch (error) {
            console.error(error)
        }
    })

  return (
    <main className="m-4 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-md p-8 w-full border-2 border-solid hover:border-black hover:shadow-xl">
            <button onClick={ () => navigate("/users")} >
                <IconBack />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{ params.id ? "Editar usuario" : "Agregar usuario"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-1 gap-4 md:md:grid-cols-2 lg:grid-cols-3 mb-2'>
                        <div className="mb-1">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Nombre del usuario</label>
                            <input 
                                id='username'
                                type='text'
                                placeholder="Nombre del usuario" 
                                {...register('username', { required: true})}
                                autoFocus
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.username && <Alert message={"El nombre del usuario es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input 
                                id='email'
                                type='email'
                                placeholder="Email del usuario" 
                                {...register('email', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
                            />
                            { errors.email && <Alert message={"El email es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1 relative">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input 
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password de usuario" 
                                {...register('password', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
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
                            { errors.password && <Alert message={"El password es requerido"} color={"bg-red-500"}/> }
                        </div>
                    
                        <div className="mb-1 relative">
                            <label htmlFor="confirmpassword" className="block text-gray-700 font-bold mb-2">Confirmación de password</label>
                            <input 
                                id='confirmpassword'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirmacion de password" 
                                {...register('confirmpassword', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2" 
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
                            { errors.confirmpassword && <Alert message={"La confirmacion del password es requerida"} color={"bg-red-500"}/> }
                        </div>

                        { differentPassword && <Alert message={"La confirmacion y el password son diferentes"} color={"bg-red-500"}/>}
                        
                        <div className="mb-1">
                            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Seleccione un rol</label>
                            <select
                                id="role"
                                type="select"
                                disabled={ user.role.name === "admin" || user.role.name === "administrador" ? false : true }
                                {...register('role', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                <option defaultValue={"Seleccione un rol"} disabled>Seleccione un rol</option>
                                {
                                    roles && roles.map((role, i) => (
                                        <option value={role._id} key={i}>{role.name}</option>
                                    ))
                                }
                            </select>
                            { ((user.role.name !== "admin") && (user.role.name !== "administrador")) && <Alert message={"No tienes permisos para modificar el rol"} color={"bg-red-500"}/> }
                            { errors.role && <Alert message={"El rol es requerido"} color={"bg-red-500"}/> }
                        </div>

                        <div className="mb-1">
                            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">Estado</label>
                            <select
                                id="state"
                                type="select"
                                {...register('state', { required: true})}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                <option defaultValue={"Seleccione un estado"} disabled>Seleccione un estado</option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                            { errors.state && <Alert message={"El estado del usuario es requerido"} color={"bg-red-500"}/> }
                        </div>

                    </div>

                    <div className="flex items-center justify-center h-full gap-4">
                        <button type='submit' className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Guardar
                            <IconSave />
                        </button>

                        <Link to={"/users"} className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                            Cancelar
                            <IconClose />
                        </Link>
                    </div>
                </form>
        </div>
    </main>
  )
}

export default UserFormPage