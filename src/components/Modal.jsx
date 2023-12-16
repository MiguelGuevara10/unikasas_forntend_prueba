import { IconClose, IconSend } from "../icons/iconsConstants"

function Modal({ onConfirm, id, onCancel }) {
  return (
    <>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-bold text-center">Confirmación de eliminación</h3>
                    <div className="mt-2">
                      <p className="text-md text-center">¿Estás seguro de que deseas eliminar este elemento?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    onClick={() => {
                        onConfirm(id)
                        onCancel()
                    }}
                    className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 orange text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
                  >Aceptar
                  <IconSend />
                </button>
                <button
                    onClick={() => onCancel()}
                    className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 red text-base font-medium text-white sm:mt-0 sm:w-auto sm:text-sm"
                  >Cancelar
                  <IconClose />
                </button>
              </div>
            </div>
          </div>
        </div>
    
    </>
  )
}

export default Modal