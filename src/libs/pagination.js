export default function pagination(items, currentPage) {
    // Número de elemtos por página
    const perPage = 1

    // Calcular el índice inicial y final para mostrar los elemntos en la página actual
    const startIndex = (currentPage - 1) * perPage
    const endIndex = currentPage * perPage

    // Calcular el número total de páginas
    const totalPages = Math.ceil(items.length / perPage) 

    // Obtener los items para la página actual
    let itemsPerPage = items.slice(startIndex, endIndex)
    return totalPages, [itemsPerPage]
}