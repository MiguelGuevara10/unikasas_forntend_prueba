import Alert from "./components/Alert"
import { useAuth } from "./context/AuthContex"
import { Navigate, Outlet } from 'react-router-dom'

/**
 * Componente de rutas protegidas para restringir el acceso si no esta autenticado,
 */
function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth()  

  // console.log(loading, isAuthenticated)
  
  if (loading) return (
      // <h1>Loading...</h1>
      <Alert message={"Cargando...."} color={"bg-green-500"}/>
  ) 
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute