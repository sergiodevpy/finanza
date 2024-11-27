export function horaMinutoSegundoActual() {
  const now = new Date();

  // Extraer las horas, minutos y segundos
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Formatear para que siempre tenga dos dígitos
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  // Concatenar en el formato hhmmss
  const time = `${hours}${minutes}${seconds}`;

  return time;
}
