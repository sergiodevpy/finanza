import { computed } from 'vue'

export function useAgrupadorIglesia(rawData) {
  const groupedByChurch = computed(() => {
    // Primero agrupamos por iglesia
    const churchGroups = rawData.value.reduce((acc, item) => {
      if (!acc[item.iglesia]) {
        acc[item.iglesia] = [];
      }
      acc[item.iglesia].push(item);
      return acc;
    }, {});

    // Transformamos el objeto en el formato deseado
    return Object.entries(churchGroups).map(([iglesia, items]) => {
      // Agrupamos por año dentro de cada iglesia
      const yearGroups = items.reduce((acc, item) => {
        if (!acc[item.anio]) {
          acc[item.anio] = {
            anio: item.anio,
            meses: [],
            ingresoTotalAnio: 0,
            egresoTotalAnio: 0,
            saldoTotalAnio: 0
          };
        }
        acc[item.anio].meses.push(item);
        // Sumamos los totales (convertimos strings a números)
        acc[item.anio].ingresoTotalAnio += parseInt(item.ingresoTotal.replace(/\./g, ''));
        acc[item.anio].egresoTotalAnio += parseInt(item.egresoTotal.replace(/\./g, ''));
        acc[item.anio].saldoTotalAnio = 
          acc[item.anio].ingresoTotalAnio - acc[item.anio].egresoTotalAnio;
        return acc;
      }, {});

      // Convertimos el objeto de años en array
      const yearsArray = Object.values(yearGroups).map(year => ({
        ...year,
        // Formateamos los números de vuelta a string con separador de miles
        ingresoTotalAnio: year.ingresoTotalAnio.toLocaleString('es-PY'),
        egresoTotalAnio: year.egresoTotalAnio.toLocaleString('es-PY'),
        saldoTotalAnio: year.saldoTotalAnio.toLocaleString('es-PY')
      }));

      return {
        iglesia,
        anios: yearsArray
      };
    });
  });

  return groupedByChurch;
}