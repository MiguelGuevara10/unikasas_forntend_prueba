import { IconFacebook, IconInstagram, IconTwitter, IconWhatsApp } from "../icons/iconsConstants"

function Footer() {
  return (
    <footer className="text-white py-4 red" >
    {/* <footer className="flex items-center justify-center bg-gray-900 text-white px-4 py-4 fixed bottom-0 w-full" > */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center font-bold">
            <div className="text-center mb-4 md:mb-0">
                <p className="mb-2">Derechos de autor © 2024. Todos los derechos reservados.</p>
                <p className="mb-2">Información de contacto: info@tuempresa.com</p>
                <p>Teléfono: +123456789</p>
            </div>
            <div>
            <ul className="flex flex-col sm:flex-row space-x-4">
                <li>
                    <a href="https://www.facebook.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-900 flex flex-col items-center justify-center flex flex-col items-center justify-center">
                        <i className="fab fa-facebook-square">Facebook</i>
                        <IconFacebook />
                    </a>
                </li>
                <li>
                    <a href="https://www.twitter.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 flex flex-col items-center justify-center">
                        <i className="fab fa-twitter-square">Twitter</i>
                        <IconTwitter />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 flex flex-col items-center justify-center">
                        <i className="fab fa-instagram-square">Instagram</i>
                        <IconInstagram />
                    </a>
                </li>
        
                <li> 
                    <a href="https://web.whatsapp.com/%F0%9F%8C%90/es_mx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-700 flex flex-col items-center justify-center">
                        <i className="fab fa-whatsapp">WhatsApp</i>
                        <IconWhatsApp />
                    </a>
                </li>
            </ul>
            </div>
        </div>
        </footer>
  )
}

export default Footer