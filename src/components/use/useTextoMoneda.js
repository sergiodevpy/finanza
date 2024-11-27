export function useTextoMoneda(valor,conSimbolo) {
    const valorNro = Math.abs(valor)
    const valorFormateado = valorNro.toLocaleString('es-Py')
    const simbolo = "GS."
    if (conSimbolo == "S") {
        return `${valorFormateado} ${simbolo}`
    } else {
        return valorFormateado 
    }
   
}
