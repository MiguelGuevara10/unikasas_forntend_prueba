import { IconFacebook, IconInstagram, IconTwitter, IconWhatsApp } from "../icons/iconsConstants"

/**
 * Componente footer del sistema
 */
function Footer() {
  return (
    <section className="red text-white py-4">
        <footer className="container mx-auto flex flex-col sm:flex-row items-center justify-between font-bold">
            <p className="text-center mb-4 sm:mb-0 flex flex-col">
                Derechos de autor © 2024. Todos los derechos reservados.
                <span>Información de contacto: info@tuempresa.com</span>
                <span>Teléfono: +123456789</span>
            </p>
            <ul className="flex flex-col sm:flex-row space-x-4 justify-center items-center">
                <li>
                    <a href="https://www.facebook.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-900 flex items-center">
                        <i className="fab fa-facebook-square mr-1">
                            <IconFacebook />
                        </i> Facebook
                    </a>
                </li>
                <li>
                    <a href="https://www.twitter.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 flex items-center">
                        <i className="fab fa-twitter-square mr-1">
                            <IconTwitter />
                        </i> Twitter
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/tuempresa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 flex items-center">
                        <i className="fab fa-instagram-square mr-1">
                            <IconInstagram />
                        </i> Instagram
                    </a>
                </li>
                <li>
                    <a href="https://web.whatsapp.com/%F0%9F%8C%90/es_mx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-700 flex items-center">
                        <i className="fab fa-whatsapp mr-1">
                            <IconWhatsApp />
                        </i> WhatsApp
                    </a>
                </li>
            </ul>
        </footer>
    </section>
  )
}

export default Footer