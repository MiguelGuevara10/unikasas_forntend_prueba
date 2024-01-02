/**
 * Función de generación del reporte solicitado
 * @param {Blob} blob - Informacion del reporte
 * @param {string} fileName - Nombre del reporte
 * @param {string} report - Tipo de reporte pdf o excel
 */
export default function reportModules(blob, fileName, report) {
    try {
        let date = ""
        try {
            date = new Date()
            date = date.toLocaleDateString() + "_" + date.toLocaleTimeString()
            fileName = `${fileName}_${date}`
        } catch (error) { // Si el navegador no lo soporta se hace con Date
            date = Date.now()
            fileName = `${fileName}_${date}`
        }
        fileName = report === 'pdf' ? `${fileName}.pdf` : `${fileName}.xlsx`
        // Crear un enlace <a> para descargar el archivo
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()

        // Liberar el objeto URL
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
    } catch (error) {
        console.error(error)
    }
}