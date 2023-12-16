import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContex"
import { useState } from "react";
import { IconClose, IconContact, IconHome, IconLagout, IconLogin, IconModules, IconProducts, IconProfile, IconProjects, IconQuotes, IconTasks, IconUs, IconUser, IconUsers } from "../icons/iconsConstants"

function Navbar() {

  const { isAuthenticated, user, logout } = useAuth()

  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };


  return (
    <>
    <header className="red shadow-md font-mono">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-5 px-10">
        {/* <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-5 px-10"> */}
            <div className="flex items-center mb-2 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                <Link to={isAuthenticated ? "/products" : "/"} className="flex items-center">
                    {/* <img src={"../src/images/logo.png"} alt="Logo" className="w-12 h-12 rounded-full"/> */}
                    <img src={'/logo.png'} alt="Logo" className="w-12 h-12 rounded-full"/>
                    <h1 className="ml-2 text-2xl font-bold text-white hover:text-gray-700">Unikasas</h1>
                </Link>
            </div>
            <div className="flex flex-col">
                {/* <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 font-bold"> */}
                <ul className="flex flex-col md:flex-row md:flex-wrap sm:items-center sm:gap-x-4 font-bold">
                    {
                        isAuthenticated ? (
                            <>
                                <Link to={"/profile"} className="flex flex-row items-center text-white text-lg px-2 py-1 rounded-md space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <IconProfile />
                                    <b> { user.username }</b> 
                                </Link>

                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/">Inicio</Link>
                                    <IconHome />
                                </li>

                                <li className="flex flex-col items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link onClick={toggleOptions}>Modulos</Link>
                                    {/* <IconModules /> */}
                                    
                                    {showOptions && (
                                    <div className="flex flex-col absolute top-100 right-100 orange shadow-md my-10 rounded-md px-6 py-6">
                                        <ul className="flex flex-col items-center">

                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/products" onClick={toggleOptions}>Productos</Link>
                                                <IconProducts />
                                            </li>

                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/projects" onClick={toggleOptions}>Proyectos</Link>
                                                <IconProjects />
                                            </li>
                                            
                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/quotes" onClick={toggleOptions}>Cotizaciones</Link>
                                                <IconQuotes />
                                            </li>

                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/users" onClick={toggleOptions}>Usuarios</Link>
                                                <IconUsers />
                                            </li>

                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/tasks" onClick={toggleOptions}>Tareas</Link>
                                                <IconTasks />
                                            </li>

                                            <li className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                <Link to="/profile" onClick={toggleOptions}>Mi perfil</Link>
                                                <IconUser />
                                            </li>

                                            <li className="flex flex-row space-x-1 mb-1 red p-2 items-center justify-center mt-2 rounded-md hover:text-white">
                                                <Link 
                                                    onClick={()=> { setShowOptions() }}
                                                >Cerrar</Link>
                                                <IconClose />
                                            </li>
                                            
                                        </ul>
                                    </div>
                                    )}
                                </li>
                                

                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/"
                                        onClick={()=> { logout() }}
                                    >Logout</Link>
                                    <IconLagout />
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/">Inicio</Link>
                                    <IconHome />
                                </li>
            
                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/us">Nosotros</Link>
                                    <IconUs />
                                </li>
            
                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/contact">Contactanos</Link>
                                    <IconContact />
                                </li>
            
                                <li className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link to="/login">Login</Link>
                                    <IconLogin />
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
        </header>
        </>
  )
}

export default Navbar