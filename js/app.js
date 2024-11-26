let historialCompras = []; // Historial de compras

const precios = {
  remera: 25000,
  buzo: 72500,
  gorra: 13500,
};

const stock = {
  remera: 10,
  buzo: 5,
  gorra: 20,
};

const calculadora = {
  suma: (a, b) => a + b,
  resta: (a, b) => a - b,
  multiplicación: (a, b) => a * b,
  división: (a, b) => b !== 0 ? a / b : "Error: División por cero no permitida",
};

// Simula una tienda de productos permitiendo seleccionar artículos, aplicar promociones, calcular impuestos y mostrar un resumen de la compra.
function simuladorTienda() {
  alert("¡Bienvenido a la tienda de SponsorDios de YSY A!");

  mostrarCatalogo();

  let totalGeneral = 0;
  let resumenCompra = "";

  do {
    const producto = prompt("Seleccione el producto que desea comprar: remera, buzo, o gorra").toLowerCase();
    const cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"), 10);

    if (!precios[producto]) {
      alert("Producto no válido. Inténtelo de nuevo.");
      continue;
    }
    if (!validarCantidad(cantidad)) continue;
    if (!verificarStock(producto, cantidad)) continue;

    const precioUnitario = precios[producto];
    const cantidadConPromocion = aplicarPromocion(producto, cantidad);
    const subtotal = calculadora.multiplicación(precioUnitario, cantidadConPromocion);
    totalGeneral = calculadora.suma(totalGeneral, subtotal);

    historialCompras.push({ producto, cantidad, subtotal });
    resumenCompra += `${cantidad} x ${producto}(s) - $${subtotal}\n`;

    console.log(`El total por ${cantidad} ${producto}(s) es: $${subtotal}`);
  } while (confirm("¿Desea agregar otro producto a su compra?"));

  const descuento = calculadora.multiplicación(totalGeneral, 0.1);
  const totalConDescuento = calculadora.resta(totalGeneral, descuento);
  const impuesto = calculadora.multiplicación(totalConDescuento, 0.21);
  const totalFinal = calculadora.suma(totalConDescuento, impuesto);

  alert(`
Resumen de su compra:
${resumenCompra}
Subtotal: $${totalGeneral}
Descuento (10%): -$${descuento}
IVA (21%): +$${impuesto}
Total Final: $${totalFinal}
  `);

  calcularCuotas(totalFinal);

  mostrarHistorialCompras();
}

// Muestra un catálogo de productos con precios y stock disponibles.
function mostrarCatalogo() {
  let catalogo = "Catálogo de productos:\n";
  for (const [producto, precio] of Object.entries(precios)) {
    catalogo += `- ${producto}: $${precio} (Stock: ${stock[producto]})\n`;
  }
  alert(catalogo);
}

// Valida que la cantidad ingresada sea un número positivo.
function validarCantidad(cantidad) {
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese una cantidad válida (mayor a 0).");
    return false;
  }
  return true;
}

// Verifica si hay suficiente stock del producto solicitado y actualiza el stock disponible.
function verificarStock(producto, cantidad) {
  if (cantidad > stock[producto]) {
    alert(`No hay suficiente stock para ${producto}. Quedan ${stock[producto]} disponibles.`);
    return false;
  }
  stock[producto] -= cantidad;
  return true;
}

// Aplica promociones específicas según el producto y la cantidad comprada.
function aplicarPromocion(producto, cantidad) {
  if (producto === "gorra" && cantidad >= 3) {
    alert("Promoción aplicada: lleva 3 gorras y paga 2.");
    return calculadora.resta(cantidad, Math.floor(cantidad / 3));
  }
  return cantidad;
}

// Calcula el total de la compra en efectivo o en cuotas con interés, según el método de pago seleccionado.
function calcularCuotas(totalFinal) {
  const metodoPago = prompt("Seleccione un método de pago: 1) Efectivo (10% de descuento), 2) Tarjeta (hasta 12 cuotas con 2% de interés por cuota)");

  let totalConDescuento = totalFinal;
  if (metodoPago === "1") {
    const descuentoEfectivo = calculadora.multiplicación(totalFinal, 0.1);
    totalConDescuento = calculadora.resta(totalFinal, descuentoEfectivo);
    alert(`Pagando en efectivo, tu total es: $${totalConDescuento}`);
  } else if (metodoPago === "2") {
    const cuotas = parseInt(prompt("¿En cuántas cuotas deseas pagar? (1 a 12)"), 10);
    if (cuotas >= 1 && cuotas <= 12) {
      const interes = calculadora.multiplicación(totalFinal, cuotas * 0.02);
      const totalConInteres = calculadora.suma(totalFinal, interes);
      const montoPorCuota = calculadora.división(totalConInteres, cuotas);
      alert(`Pagando en ${cuotas} cuotas, cada una será de: $${montoPorCuota.toFixed(2)} (Total: $${totalConInteres})`);
    } else {
      alert("Número de cuotas no válido.");
    }
  } else {
    alert("Método de pago no válido.");
  }
}

// Muestra un historial detallado de las compras realizadas durante la sesión.
function mostrarHistorialCompras() {
  if (historialCompras.length === 0) {
    alert("No se realizaron compras.");
    return;
  }

  const historialTexto = historialCompras.map(
    compra => `Producto: ${compra.producto}, Cantidad: ${compra.cantidad}, Subtotal: $${compra.subtotal}`
  ).join("\n");

  alert("Historial de compras:\n" + historialTexto);
}

simuladorTienda();
