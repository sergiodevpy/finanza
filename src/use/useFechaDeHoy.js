export function obtenerFechaHoy() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0"); // Obtiene el día y lo formatea con dos dígitos
  const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (0-11) y lo formatea con dos dígitos
  const anio = hoy.getFullYear(); // Obtiene el año

  return `${dia}/${mes}/${anio}`; // Retorna la fecha en formato DD/MM/YYYY
}
