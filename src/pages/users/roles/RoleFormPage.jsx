import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRole } from "../../../context/RolContex"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IconBack, IconClose, IconSave } from "../../../icons/iconsConstants"
import Alert from "../../../components/Alert"

function RoleFormPage() {

    // Funciones y variables a usar en el formulario
    const { register, handleSubmit, setValue, formState: { errors} } = useForm()
    const [loadingRole, setLoadingRole] = useState(false)

    const { createRole, getRole, updateRole, errors: errorsMessage, setSucces } = useRole()
    const navigate = useNavigate()  
    const params = useParams()

    // Privilegios de usuario
    const privileges = [
        "Visualizar",
        "Crear",
        "Modificar",
        "Eliminar",
        "Reportes",
        "Roles"
    ]

    // Cargar informacion de la tarea en caso de ser un update
    useEffect(() => {
        async function loadTask() {
        if (params.id && !loadingRole) {
            const role = await getRole(params.id)
            setValue('name', role.name)
            // Marcar solo los Privilegios existentes
            privileges.forEach(privilege => {
                if (role.privileges.includes(privilege)) setValue(`privileges[${privileges.indexOf(privilege)}]`, privilege)
            })

            setLoadingRole(true) // Cabiar el estado a tarea cargada
        }
        }
        loadTask()
    })

     // Enviar datos de la tarea 
    const onSubmit = handleSubmit(async (data)=> {
        const dataValid = {
            ...data,
            privileges: data.privileges.filter(privilege => privilege !== false) // Quitar los que no se selecionaron
        }
        let res = {}
        if (params.id) { // si existe el id quere decir que es un update si no un create
            res = await updateRole(params.id, dataValid)
            setSucces(["Rol modificado con exito"])
        } else {
            res = await createRole(dataValid)
            setSucces(["Rol creado con exito"])
        }
        if (res.status == 200) navigate("/roles") // retornar a productos
    })
  return (
    <main className="flex justify-center items-center px-800 m-10">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded-md p-8 max-w-lg w-full border-2 border-solid hover:border-black hover:shadow-xl">
                <Link to={"/roles"}>
                    <IconBack />
                </Link>
                <h2 className="text-2xl font-bold mb-4 text-center">{ params.id ? "Editar rol" : "Agregar rol"}</h2>
                {
                    errorsMessage && errorsMessage.map((error, i) => (
                        <Alert message={error} color={"bg-red-500"} key={i}/>
                    ))
                }
                <div className="mb-2">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre del rol</label>
                    <input 
                        id='name'
                        type="text" 
                        {...register('name', { required: true})} 
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-3 py-2" 
                        placeholder="Nombre del rol" 
                    />
                    { errors.name && <Alert message={"El nombre del rol es requerido"} color={"bg-red-500"}/> }
                </div>

                <fieldset className="mb-4">
                    <legend className="block text-gray-700 font-bold mb-2">Privilegios</legend>
                    { privileges.map((privilege, i) => (
                        <div key={i} className='inline-flex items-center'>
                            <label htmlFor={privilege} className='justify-center items-center ml-2'>
                                <input
                                    id={privilege}
                                    type="checkbox"
                                    defaultChecked={ !params.id ? privilege === "Visualize": false}
                                    value={privilege}
                                    {...register(`privileges[${i}]`)}
                                    className='mr-1 rounded-md'
                                />
                                { privilege }
                            </label>
                        </div>
                    ))}
                </fieldset>

                <div className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-row lg:flex-row">
                    <button 
                      type='submit'
                      className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Guardar
                        <IconSave />
                    </button>

                    <Link 
                        to={"/roles"}
                        className="flex items-center red text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                        Cancelar                           
                        <IconClose />
                    </Link> 
            </div>

            </form>
        </main>
  )
}

export default RoleFormPage