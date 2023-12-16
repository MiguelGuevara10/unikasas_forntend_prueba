import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContex"
import { IconEdit, IconProfile } from "../../icons/iconsConstants"

function ProfilePage() {

  const { user } = useAuth()
  
  return (
    <div className="flex items-center justify-center m-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center border-2 border-solid hover:border-black hover:shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-bold">Perfil de Usuario</h2>
        </div>

        <div className="flex items-center justify-center mb-5">
          <IconProfile />
        </div>
        
        <div className="mb-4 text-left">
          <p><b>Id:</b> {user.id}</p>
          <p><b>Nombre:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Rol:</b> Admin </p>
          {/* Agregar otros campos de datos del perfil */}
        </div>
        <button className="orange flex items-center justify-center m-auto text-white font-bold py-2 px-4 rounded">
            <Link to={`/add-product/${user._id}`}>Editar</Link>
            <IconEdit />
        </button>
      </div>
    </div>
  )
}

export default ProfilePage