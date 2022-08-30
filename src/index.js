const tablaValores = document.getElementById("valores-dolar-tabla");
const tablaArbitrajes = document.getElementById("arbitrajes");

const valoresDolar = {
  blue: { nombre: "Blue", compra: 0, venta: 0 },
  mep: { nombre: "MEP", compra: 0, venta: 0 },
  ccl: { nombre: "CCL", compra: 0, venta: 0 },
  crypto: { nombre: "Crypto", compra: 0, venta: 0 },
  solidario: { nombre: "Solidario", venta: 0 },
  oficial: { nombre: "Oficial", compra: 0, venta: 0 }
};
let diferenciasDolar = {};

function generarFilaValores(tipoDolar) {
  return `<tr>
  <td>${tipoDolar.nombre}</td>
  <td>$${tipoDolar.compra || 0}</td>
  <td>$${tipoDolar.venta || 0}</td>
  </tr>`;
}

function generarTablaValores() {
  tablaValores.innerHTML += generarFilaValores(valoresDolar.oficial);
  tablaValores.innerHTML += generarFilaValores(valoresDolar.solidario);
  tablaValores.innerHTML += generarFilaValores(valoresDolar.mep);
  tablaValores.innerHTML += generarFilaValores(valoresDolar.ccl);
  tablaValores.innerHTML += generarFilaValores(valoresDolar.blue);
  tablaValores.innerHTML += generarFilaValores(valoresDolar.crypto);
}

function generarDiferencias(valores) {
  const diferencialesFinal = {};
  for (let valorDolarAntiguo of Object.entries(valores)) {
    const claveAntigua = valorDolarAntiguo[0];
    const diferenciales = {};
    const compraAntiguo = valorDolarAntiguo[1].venta;

    // console.log(`Clave Actual: `, claveAntigua);
    // console.log(`Compra Antiguo: `, compraAntiguo);

    for (let valorDolarNuevo of Object.entries(valores)) {
      const claveNueva = valorDolarNuevo[0];
      // console.log(`Clave Nueva: `, claveNueva);

      const ventaNuevo = valorDolarNuevo[1].compra;
      // console.log(`Venta Nuevo: `, ventaNuevo);

      const diferencial = ((ventaNuevo - compraAntiguo) / compraAntiguo) * 100;
      // console.log(`diferencia: `, diferencial);

      diferenciales[claveNueva] = diferencial;
    }
    // console.log(diferenciales);

    diferencialesFinal[claveAntigua] = diferenciales;
  }
  return diferencialesFinal;
}

function generarFila(fila) {
  let filaValor = `<tr>`;
  for (let valor of fila) {
    if (isNaN(valor)) {
      filaValor += `<td>${valor}</td>`;
    } else {
      if (valor < 0) {
        filaValor += `<td class='red'>${valor.toFixed(2)}%</td>`;
      } else if (valor > 0) {
        filaValor += `<td class='green'>${valor.toFixed(2)}%</td>`;
      } else {
        filaValor += `<td >${valor.toFixed(2)}%</td>`;
      }
    }
  }
  filaValor += `</tr>`;

  return filaValor;
}

function generarTablaArbitrajes() {
  tablaArbitrajes.innerHTML += generarFila([
    "Pesos",
    ...Object.keys(diferenciasDolar)
  ]);
  for (let dolar of Object.entries(diferenciasDolar)) {
    // console.log(dolar);
    const dolarActual = dolar[0];
    const porcentajes = Object.values(dolar[1]);
    const filaDiferencias = [dolarActual, ...porcentajes];
    tablaArbitrajes.innerHTML += generarFila(filaDiferencias);
  }
}

async function buscarDolar(url) {
  const options = { method: "GET" };

  const response = await fetch(url, options);
  const data = await response.json();
  return {
    venta: parseFloat(data.venta.replace(",", ".")),
    compra: parseFloat(data.compra.replace(",", "."))
  };
}

async function buscarDolarCripto() {
  const options = { method: "GET" };

  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://app.ripio.com/api/v3/public/rates/?country=AR",
    options
  );
  const data = await response.json();
  const valorUsdt = data.find((valor) => valor.ticker === "USDT_ARS");
  return {
    compra: parseFloat(valorUsdt.buy_rate),
    venta: parseFloat(valorUsdt.sell_rate)
  };
}

async function cargarDatos() {
  const dolarOficial = await buscarDolar(
    "https://mercados.ambito.com//dolar/oficial/variacion"
  );
  const dolarBlue = await buscarDolar(
    "https://mercados.ambito.com//dolar/informal/variacion"
  );
  const dolarCcl = await buscarDolar(
    "https://mercados.ambito.com//dolarrava/cl/variacion"
  );
  const dolarSolidario = await buscarDolar(
    "https://mercados.ambito.com//dolarturista/variacion"
  );
  const dolarMep = await buscarDolar(
    "https://mercados.ambito.com//dolarrava/mep/variacion"
  );
  const dolarCripto = await buscarDolarCripto();
  // console.log({
  //   dolarOficial,
  //   dolarBlue,
  //   dolarCcl,
  //   dolarSolidario,
  //   dolarMep,
  //   dolarCripto
  // });
  valoresDolar.blue = { ...valoresDolar.blue, ...dolarBlue };
  valoresDolar.oficial = { ...valoresDolar.oficial, ...dolarOficial };
  valoresDolar.mep = { ...valoresDolar.mep, ...dolarMep };
  valoresDolar.ccl = { ...valoresDolar.ccl, ...dolarCcl };
  valoresDolar.solidario = { ...valoresDolar.solidario, ...dolarSolidario };
  valoresDolar.crypto = { ...valoresDolar.crypto, ...dolarCripto };
}

async function main() {
  await cargarDatos();
  diferenciasDolar = generarDiferencias(valoresDolar);
  generarTablaValores();
  generarTablaArbitrajes();
}

main();
