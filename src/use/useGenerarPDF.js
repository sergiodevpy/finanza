import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "src/components/pdf/vfs_fonts";
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";
import { useStoreActaDB } from "src/stores/storeActaDB";
import { store } from "quasar/wrappers";

export function generaActaPDF(actaID) {
  pdfMake.vfs = pdfFonts;
  const storeIngresos = usePageStoreActaOfrenda();
  const storeActaDB = useStoreActaDB();

  const acta = storeActaDB.obtenerActa(actaID);

  //campos del reporte
  const cant_100000 = storeActaDB.traerDato("BILLETE", 100000, "cantidad");
  const cant_50000 = storeActaDB.traerDato("BILLETE", 50000, "cantidad");
  const cant_20000 = storeActaDB.traerDato("BILLETE", 20000, "cantidad");
  const cant_10000 = storeActaDB.traerDato("BILLETE", 10000, "cantidad");
  const cant_5000 = storeActaDB.traerDato("BILLETE", 5000, "cantidad");
  const cant_2000 = storeActaDB.traerDato("BILLETE", 2000, "cantidad");

  const cant_1000 = storeActaDB.traerDato("MONEDA", 1000, "cantidad");
  const cant_500 = storeActaDB.traerDato("MONEDA", 500, "cantidad");
  const cant_100 = storeActaDB.traerDato("MONEDA", 100, "cantidad");
  const cant_50 = storeActaDB.traerDato("MONEDA", 50, "cantidad");

  const total_100000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 100000, "totalValor"),
    "S"
  );
  const total_50000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 50000, "totalValor"),
    "S"
  );
  const total_20000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 20000, "totalValor"),
    "S"
  );
  const total_10000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 10000, "totalValor"),
    "S"
  );
  const total_5000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 5000, "totalValor"),
    "S"
  );
  const total_2000 = useTextoMoneda(
    storeActaDB.traerDato("BILLETE", 2000, "totalValor"),
    "S"
  );

  const total_1000 = useTextoMoneda(
    storeActaDB.traerDato("MONEDA", 1000, "totalValor"),
    "S"
  );
  const total_500 = useTextoMoneda(
    storeActaDB.traerDato("MONEDA", 500, "totalValor"),
    "S"
  );
  const total_100 = useTextoMoneda(
    storeActaDB.traerDato("MONEDA", 100, "totalValor"),
    "S"
  );
  const total_50 = useTextoMoneda(
    storeActaDB.traerDato("MONEDA", 50, "totalValor"),
    "S"
  );

  //   const totalMonedas = useTextoMoneda(acta.totalMonedas, "S");
  //   const totalBilltes = useTextoMoneda(acta.totalBilletes, "S");
  //     const totalIngresos = useTextoMoneda(acta.totalIngresos, "S");

  const totalMonedas = `${acta.totalMonedas} GS.`;
  const totalBilltes = `${acta.totalBilletes} GS.`;
  const totalIngresos = `${acta.totalIngresos} GS.`;

  const supervisadoPor = acta.supervisadoPor;
  const contadoPor = acta.contadoPor;
  const observaciones = acta.observaciones ? acta.observaciones : "-----";

  let docDefinition = {
    pageSize: "A5",
    pageOrientation: "landscape",
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [40, 10, 40, 10],
    info: {
      title: "Acta de conteo",
      author: "App de finanzas",
      subject: "para administradores",
      keywords: "Registro ofrenda",
    },
    content: [
      {
        text: "ACTA DE CONTEO DE OFRENDAS COLECTIVAS Nro. ......./.......",
        style: "header",
      },
      // {
      //   text: `A los ${storeIngresos.dia} días del mes de ${storeIngresos.mesEnLetras} del año ${storeIngresos.anio} procedemos al conteo de las ofrendas de la Iglesia Cristiana Evangélica del Centro, RUC 801125138-9. Sede/Anexo ${storeIngresos.iglesia} correspondiente al evento Culto dominical según se detalla a Continuación:`,
      //   alignment: "justify",
      // },
      {
        text: [
          "A los ",
          { text: `${storeActaDB.dia}`, fontSize: 15, bold: true },
          " días del mes de ",
          { text: `${storeActaDB.mesEnLetras}`, fontSize: 15, bold: true },
          " del año ",
          { text: `${storeActaDB.anio}`, fontSize: 15, bold: true },
          " procedemos al conteo de las ofrendas de la Iglesia Cristiana Evangélica del Centro, RUC 801125138-9. Sede/Anexo ",
          { text: `${acta.iglesia}`, fontSize: 15, bold: true },
          " correspondiente al evento Culto dominical según se detalla a Continuación:",
        ],
        alignment: "justify",
      },
      {
        style: "tableExample",
        table: {
          widths: [55, 55, "*", 55, 55, "*"],
          body: [
            [
              { text: "Billetes", style: "tableHeader", alignment: "center" },
              { text: "Cantidad", style: "tableHeader", alignment: "center" },
              { text: "Total", style: "tableHeader", alignment: "center" },
              { text: "Monedas", style: "tableHeader", alignment: "center" },
              { text: "Cantidad", style: "tableHeader", alignment: "center" },
              { text: "Total", style: "tableHeader", alignment: "center" },
            ],

            [
              { text: "100.000", alignment: "right" },
              `${cant_100000}`,
              { text: `${total_100000}`, alignment: "right" },
              { text: "1.000", alignment: "right" },
              `${cant_1000}`,
              { text: `${total_1000}`, alignment: "right" },
            ],
            [
              { text: "50.000", alignment: "right" },
              `${cant_50000}`,
              { text: `${total_50000}`, alignment: "right" },
              { text: "500", alignment: "right" },
              `${cant_500}`,
              { text: `${total_500}`, alignment: "right" },
            ],
            [
              { text: "20.000", alignment: "right" },
              `${cant_20000}`,
              { text: `${total_20000}`, alignment: "right" },
              { text: "100", alignment: "right" },
              `${cant_100}`,
              { text: `${total_100}`, alignment: "right" },
            ],
            [
              { text: "10.000", alignment: "right" },
              `${cant_10000}`,
              { text: `${total_10000}`, alignment: "right" },
              { text: "50", alignment: "right" },
              `${cant_50}`,
              { text: `${total_50}`, alignment: "right" },
            ],
            [
              { text: "5.000", alignment: "right" },
              `${cant_5000}`,
              { text: `${total_5000}`, alignment: "right" },
              {
                text: "TOTAL en monedas",
                italics: true,
                style: "tableHeader",
                colSpan: 2,
                alignment: "right",
              },
              "",
              { text: `${totalMonedas}`, alignment: "right" },
            ],
            [
              { text: "2.000", alignment: "right" },
              `${cant_2000}`,
              { text: `${total_2000}`, alignment: "right" },
              {
                text: "\nTOTAL RECAUDADO",
                italics: true,
                style: "tableHeader",
                colSpan: 2,
                rowSpan: 2,
                alignment: "right",
              },
              "",
              {
                text: `\n${totalIngresos}`,
                alignment: "right",
                style: "tableHeader",
                rowSpan: 2,
              },
            ],
            [
              {
                text: "TOTAL en billetes",
                italics: true,
                style: "tableHeader",
                colSpan: 2,
                alignment: "right",
              },
              "",
              { text: `${totalBilltes}`, alignment: "right" },
              "50",
              "{{Cantidad}}",
              "{Total}",
            ],
          ],
        },
      },

      `Observaciones: ${observaciones}`,
      " ",
      " ",
      {
        alignment: "left",
        columns: [
          {
            text: `Contado por: ${contadoPor}`,
          },
          {
            text: `Supervisado por: ${supervisadoPor}`,
          },
        ],
      },

      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(docDefinition).open();
}
