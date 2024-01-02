import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContex"
import { useState } from "react";
import { IconClose, IconContact, IconHome, IconLagout, IconLogin, IconModules, IconProducts, IconProfile, IconProjects, IconQuotes, IconTasks, IconUs, IconUser, IconUsers } from "../icons/iconsConstants"

/**
 * Componente barra de navegación del sistema,
 */
function Navbar() {
  
  // Informacion del usuario para aplicar logica de que se debe visualizar o redireccionar
  const { isAuthenticated, user, logout } = useAuth()

  // Mostar o ocultar modulos del sistema 
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions(!showOptions)
  }

  return (
    <header className="red shadow-md font-mono ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2 px-2">
            <div className="flex items-center mb-0 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                <Link to={isAuthenticated ? "/products" : "/"} className="flex items-center">
                    <img src={'/logo.png'} alt="Logo" className="w-12 h-12 rounded-full" loading="lazy"/>
                    <h1 className="ml-2 text-2xl font-bold text-white hover:text-gray-700">Unikasas</h1>
                </Link>
            </div>
            <nav className="flex flex-col">
                <ul className="flex flex-col items-center md:flex-row md:flex-wrap sm:items-center sm:gap-x-4 font-bold">
                    {
                        isAuthenticated ? (
                        <>
                            <li>
                                <Link to={"/profile"} className="flex flex-row items-center text-white text-lg px-2 py-1 rounded-md space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <IconProfile />
                                    <b> { user.username }</b> 
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Inicio
                                    <IconHome />
                                </Link>
                            </li>

                            <li className="flex flex-col z-20 items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    <Link onClick={toggleOptions} className="flex flex-row items-center space-x-1 cursor-pointer">
                                        Modulos
                                        <IconModules />
                                    </Link>
                                
                                    {showOptions && (
                                    <section className="flex flex-col absolute top-100 right-100 orange shadow-md my-10 rounded-md px-6 py-6">
                                        <ul className="flex flex-col items-center">
                                            { /* Roles con acceso a los oduos de Productos, Proyectos y Cotizaciones: admin, administrador, secretaria, usuario */
                                                user && (user.role.name.toLowerCase().includes("admin") || user.role.name.toLowerCase().includes("administrador") ||
                                                        user.role.name.toLowerCase().includes("secertaria") || user.role.name.toLowerCase().includes("usuario")
                                                    ) &&
                                                <>
                                                    <li>
                                                        <Link to={"/products"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                            Productos
                                                            <IconProducts />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/projects"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                            Proyectos
                                                            <IconProjects />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={"/quotes"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                            Cotizaciones
                                                            <IconQuotes />
                                                        </Link>
                                                    </li>
                                                </>
                                            }
                                            
                                            { /* Role con acceso al modulo de Usuarios: admin y administrador */
                                                user && (user.role.name.toLowerCase().includes("admin") || user.role.name.toLowerCase().includes("administrador")) &&
                                                <li>
                                                    <Link to={"/users"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                        Usuarios
                                                        <IconUsers />
                                                    </Link>
                                                </li>
                                            }

                                            { /* Roles con acceso al modulo de contactos: admin, administrador, secretaria, usuario */
                                                user && (user.role.name.toLowerCase().includes("admin") || user.role.name.toLowerCase().includes("administrador") ||
                                                        user.role.name.toLowerCase().includes("secertaria") || user.role.name.toLowerCase().includes("usuario")
                                                    ) &&
                                                    <li>
                                                        <Link to={"/contacts-people"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                            Contactos 
                                                            <IconContact />
                                                        </Link>
                                                    </li>
                                            }
                                            
                                            <li>
                                                <Link to={"/tasks"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                    Tareas
                                                    <IconTasks />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/profile"} onClick={toggleOptions} className="flex flex-row space-x-1 mb-1 hover:text-white">
                                                    Mi perfil
                                                    <IconUser />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={()=> { setShowOptions() }} className="flex flex-row space-x-1 mb-1 red p-2 items-center justify-center mt-2 rounded-md hover:text-white">
                                                    Cerrar
                                                    <IconClose />
                                                </Link>
                                            </li>
                                            
                                        </ul>
                                    </section>
                                    )}
                            </li>
                            <li>
                                <Link to={"/"} onClick={()=> { logout() }} className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Logout
                                    <IconLagout />
                                </Link>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <Link to={"/"} className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Inicio
                                    <IconHome />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/us"} className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Nosotros
                                    <IconUs />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/contact"} className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Contacto
                                    <IconContact />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/login"} className="flex flex-row items-center orange text-white text-lg px-2 py-1 rounded-md hover:text-gray-700 space-x-1 mb-1 sm:mb-1 md:mb-1 lg:0 xl:mb-0">
                                    Login
                                    <IconLogin />
                                </Link>
                            </li>
                        </>
                        )
                    }
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Navbar