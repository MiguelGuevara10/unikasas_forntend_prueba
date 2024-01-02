import { IconInformation, IconMision, IconVission } from "../../icons/iconsConstants"

function UsPage() {
  return (
    <main className="px-1 py-1 sm:px-6 lg:col-span-3 lg:px-8 mb-4">
        <h1 className="text-center text-2xl font-bold mb-4 my-2">Nosotros</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconInformation />

                <h2 className="text-lg font-bold mb-2">Información de la Empresa</h2>
                <p>
                    Somos una empresa líder en la industria de la construcción modular, especializados en la creación de hogares modernos, eficientes y sostenibles. Con años de experiencia en la fabricación de casas prefabricadas, ofrecemos una amplia gama de diseños personalizables que combinan la innovación arquitectónica con prácticas eco-amigables. Nuestro compromiso es proporcionar viviendas de calidad excepcional, adaptadas a las necesidades de nuestros clientes, mediante procesos de construcción eficientes y materiales de primera calidad. Nos esforzamos por ofrecer soluciones habitacionales que no solo transformen espacios, sino que también inspiren estilos de vida modernos y sostenibles.
                </p>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconVission />

                <h2 className="text-lg font-bold mb-2">Visión</h2>
                <p>
                    En nuestra visión, nos vemos como pioneros en la industria de la construcción prefabricada, transformando la manera en que las personas perciben y experimentan el proceso de adquisición de viviendas. Buscamos ser reconocidos como líderes innovadores que ofrecen soluciones habitacionales sostenibles, eficientes y personalizadas. Nos esforzamos por marcar la diferencia al proporcionar hogares que no solo cumplen con las necesidades y deseos de nuestros clientes, sino que también incorporan un diseño moderno, sostenible y adaptable a un mundo en constante evolución. Nuestra visión se fundamenta en la idea de crear comunidades prósperas y sostenibles, brindando hogares que no solo sean residencias, sino espacios donde florezca la vida y se construyan sueños.
                </p>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 text-center border-2 border-solid hover:border-black hover:shadow-xl">
                <IconMision />

                <h2 className="text-lg font-bold mb-2">Misión</h2>
                <p>
                    Nos vemos como agentes de cambio en la industria de la vivienda prefabricada, aspirando a redefinir los estándares de calidad, innovación y sostenibilidad. Nuestra visión es liderar el mercado ofreciendo hogares modulares que fusionen la comodidad moderna con la conciencia ambiental. Buscamos ser reconocidos por nuestra capacidad para crear comunidades vibrantes y sostenibles, proporcionando soluciones habitacionales que superen las expectativas de nuestros clientes en términos de diseño, funcionalidad y compromiso con el medio ambiente. Nuestro enfoque se centra en construir no solo casas, sino espacios de vida que inspiren, conecten y enriquezcan la vida de las personas.
                </p>
            </div>
        </div>
    </main>
  )
}

export default UsPage