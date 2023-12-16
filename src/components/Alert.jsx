import { IconAlert } from "../icons/iconsConstants"

function Alert({ message, color }) {
  return (
    <div className={ `${color} border-l-4 border-yellow-500 text-white p-2 rounded-lg m-1 flex items-center` } role="alert">
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