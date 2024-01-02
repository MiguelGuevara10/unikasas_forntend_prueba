import { IconFollowing, IconFormer } from "../icons/iconsConstants"

/**
 * Componente de paginación de los modulos,
 * Recibe los siguientes parametros:
 * @param {Function} goToPrevPage - Funcion de pagina anterior
 * @param {Function} goToNextPage - Funcion de pagina siguiente
 * @param {Number} currentPage - Numero de pagina actual necesario para cambiar pagina
 * @param {Number} totalPages - Cantidad de paginas
 */
// eslint-disable-next-line react/prop-types
function Pagination({ goToPrevPage, goToNextPage, currentPage, totalPages }) {
  return (
    <section className="flex flex-col items-center justify-center h-full gap-2 sd:flex-col md:flex-col lg:flex-row mt-2">
            <button 
                onClick={() => { 
                  goToPrevPage()
                }}
                disabled={currentPage === 1}
                className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                    <IconFormer />
                    Anterior
            </button>
            
            <span>Pagina <b>({currentPage})</b> de <b>{totalPages}</b></span>

            <button 
                onClick={() => { 
                    goToNextPage()
                }}
                className="flex items-center orange text-white font-bold py-2 px-4 rounded-md hover:text-gray-700 space-x-1 mb-1">
                    Siguiente
                    <IconFollowing />
            </button> 
    </section>
  )
}

export default Pagination