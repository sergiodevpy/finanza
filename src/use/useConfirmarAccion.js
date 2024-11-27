import { useQuasar } from "quasar";

export function useConfirmarAccion() {
  const $q = useQuasar();

  const confirmarAccion = (titulo, mensaje, textoOk, textoCancelar) => {
    return new Promise((resolve) => {
      $q.dialog({
        title: titulo,
        message: mensaje,
        cancel: true,
        persistent: true,
        ok: {
          label: textoOk,
          color: "primary",
        },
        cancel: {
          label: textoCancelar,
          color: "red",
        },
      })
        .onOk(() => resolve(true))
        .onCancel(() => resolve(false));
    });
  };

  return { confirmarAccion };
}
