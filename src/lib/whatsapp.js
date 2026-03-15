// src/lib/whatsapp.js

/**
 * Generates a WhatsApp wa.me link with the order details
 * @param {Array} carrito - The array of cart items
 * @returns {string} The formatted URL
 */
export function generarMensajeWhatsApp(carrito) {
  // Configured default number from requirements
  const TU_NUMERO = '5353770707';

  let mensaje = 'Hola, quiero hacer este pedido:%0A%0A';

  carrito.forEach(item => {
    // Formatting: • Product Name x2 — $200
    mensaje += `• ${item.nombre} x${item.cantidad} — $${item.precio * item.cantidad}%0A`;
  });

  const total = carrito.reduce((s, i) => s + (i.precio * i.cantidad), 0);
  
  mensaje += `%0A*Total: $${total}*%0A%0A¿Están disponibles?`;

  return `https://wa.me/${TU_NUMERO}?text=${mensaje}`;
}
