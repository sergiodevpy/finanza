import { Platform } from "quasar";

export function enviaWhatsaap(mensaje) {
  const encodedMessage = encodeURIComponent(mensaje);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  console.log(Platform.is.mobile);
  if (Platform.is.mobile) {
    window.location.href = whatsappUrl;
  } else {
    window.open(whatsappUrl, "_blank");
  }
}
