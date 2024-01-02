import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContex"
import { IconEdit } from "../../icons/iconsConstants"

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function ProfilePage() {

  // Usuario registado en el sistema
  const { user } = useAuth()
  
  return (
    <main className="flex items-center justify-center m-2">
      <section className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center border-2 border-solid hover:border-black hover:shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-bold">Perfil de Usuario</h2>
        </div>

        <div className="border border-gray-300 rounded p-4 mb-4">
                <h2 className="font-bold text-lg mb-2"><b>Nombre: </b>{user.username}</h2>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Email: </b>{user.email}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Rol: </b>{user.role.name}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Privilegios: </b>{user.role.privileges ? user.role.privileges.join(', ') : ""}</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Estado: </b>{user.state === true ? "Activo" : "Inactivo" }</span>
                <hr className="border-t border-gray-300 m-2"></hr>

                <span><b>Fecha de creación: </b>{dayjs(user.createdAt).utc().format("DD/MM/YYYY")}</span>
                <hr className="border-t-4 border-[green] rounded-md m-2"></hr>

                <span><b>Ultima actialización del perfil: </b>{dayjs(user.updatedAt).utc().format("DD/MM/YYYY")}</span>
        
            </div>

            <div className="flex items-center justify-center h-full gap-4">
              { user.role.privileges && user.role.privileges.includes('Modificar') &&
                <Link to={`/add-user/${user._id}`} className="orange flex items-center justify-center m-auto text-white font-bold py-2 px-4 rounded">
                    Editar
                    <IconEdit />
                </Link>
              }
            </div>
        
      </section>
    </main>
  )
}

export default ProfilePage