import { IconSearch } from '../icons/iconsConstants'

/**
 * Componente barra de busqueda de los modulos,
 * recibe los siguientes parametros:
 * @param {string} module_title - El titulo del modulo 
 * @param {Function} onSubmit - Funcion de envio de información
 * @param {Function} register - Funcion para manejar los datos del campo del formulario
 * @param {string} text - Texto de busqueda en el input
 */
// eslint-disable-next-line react/prop-types
function SearchBar({ module_title, onSubmit, register, text }) {
  return (
    <section className="mx-auto max-w-2xl text-center mb-3">
        <h2 className="text-3xl font-bold sm:text-2xl mb-2">{module_title}</h2>
        <form onSubmit={onSubmit}>
            <div className="flex justify-center">
              <input 
                  type="text" 
                  placeholder={text} 
                  {...register('query')}
                  className="w-full rounded-md px-4 py-2 border border-black-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
              <button 
                  type="submit" 
                  className="flex flex-row items-center ml-2 rounded-md text-white px-4 py-2 orange font-bold hover:text-gray-700 space-x-1" 
                  >Buscar
                  <IconSearch />
              </button>
            </div>
        </form>
    </section>
  )
}

export default SearchBar