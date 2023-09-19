class Calculadora {
    constructor() {

        this.denominaciones = [
            { nombre: "100 pesos", valor: 100 },
            { nombre: "50 pesos", valor: 50 },
            { nombre: "20 pesos", valor: 20 },
            { nombre: "10 pesos", valor: 10 },
            { nombre: "5 pesos", valor: 5 },
            { nombre: "1 peso", valor: 1 },
            { nombre: "50 centavos", valor: 0.5 },
            { nombre: "20 centavos", valor: 0.2 },
            { nombre: "1 centavo", valor: 0.01 }
        ];
    }

    calcularCambio(totalPagar, pagoRecibido) {
        let cambio = pagoRecibido - totalPagar;
        let resultado = {};

        this.denominaciones.sort((a, b) => b.valor - a.valor);

        this.denominaciones.forEach((moneda) => {
            const valorMoneda = moneda.valor;
            const nombreMoneda = moneda.nombre;

            const cantidadMonedas = Math.floor(cambio / valorMoneda);
            if (cantidadMonedas > 0) {
                resultado[nombreMoneda] = cantidadMonedas;
                cambio -= cantidadMonedas * valorMoneda;
                cambio = parseFloat(cambio.toFixed(2));
            }
        });

        return resultado;
    }
}

const calculadora = new Calculadora();

function cambiarFormulario() {
    var figuraSeleccionada = document.getElementById("practica").value;
    document.getElementById("sistemaCobro").style.display = "none";
    document.getElementById("hanoi").style.display = "none";
    document.getElementById(figuraSeleccionada).style.display = "block";
}

function calcularCobro() {
    var totalPagar = parseFloat(document.getElementById("totalP").value);
    var pagoRecibido = parseFloat(document.getElementById("totalR").value);
    var resultado = calculadora.calcularCambio(totalPagar, pagoRecibido);

    var cambioLista = document.createElement("ul");

    for (var i = 0; i < calculadora.denominaciones.length; i++) {
        var moneda = calculadora.denominaciones[i].nombre;
        var cantidad = resultado[moneda] || 0;
        var item = document.createElement("li");
        item.textContent = cantidad + " moneda" + (cantidad === 1 ? "" : "s") + " de " + moneda;
        cambioLista.appendChild(item);
    }

    document.getElementById("resultadoCambio").textContent = "";
    document.getElementById("resultadoCambio").appendChild(cambioLista);
}

function calcularHanoi() {
    var numDiscos = parseInt(document.getElementById("numA").value);
    var origen = "Barra 1";
    var destino = "Barra 3";
    var auxiliar = "Barra 2";

    var movimientos = resolverTorresDeHanoi(numDiscos, origen, destino, auxiliar);

    document.getElementById("resultadoMCD").textContent = movimientos.join("\n");
}

function resolverTorresDeHanoi(numDiscos, origen, destino, auxiliar) {
    var movimientos = [];

    if (numDiscos === 1) {
        movimientos.push(`Mover disco 1 de ${origen} a ${destino}`);
        return movimientos;
    }

    movimientos = movimientos.concat(resolverTorresDeHanoi(numDiscos - 1, origen, auxiliar, destino));

    movimientos.push(`Mover disco ${numDiscos} de ${origen} a ${destino}`);

    movimientos = movimientos.concat(resolverTorresDeHanoi(numDiscos - 1, auxiliar, destino, origen));

    return movimientos;
}
