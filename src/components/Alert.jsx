import { IconAlert } from "../icons/iconsConstants"

/**
 * Componente de alertas de mesajes permite mostrar mesajes personalizados,
 * recibe los siguientes parametros:
 * @param {string} message - Corresponde al mensaje a mostrar 
 * @param {string} color - corresponde al color de la notificación 
 */
// eslint-disable-next-line react/prop-types
function Alert({ message, color }) {
  return (
    <div className={ `${color} border-l-4 border-yellow-500 text-white p-2 rounded-lg m-1 flex items-center mb-2` } role="alert">
        <div className="mr-4">
            <IconAlert />
        </div>
        <div>
            {/* <p className="font-bold">¡Alerta!</p> */}
            <p>{ message }</p>
        </div>
    </div>
  )
}

export default Alert