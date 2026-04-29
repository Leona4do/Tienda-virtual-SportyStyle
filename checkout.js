// ============================================================
// js/checkout.js  -  Formulario de pago con validaciones
// ============================================================

function processPayment() {
  // Leer los valores del formulario
  var name    = document.getElementById('full-name').value.trim();
  var address = document.getElementById('address').value.trim();
  var email   = document.getElementById('email').value.trim();
  var phone   = document.getElementById('phone').value.trim();

  // VALIDACION 1: Ningún campo puede estar vacío
  if (!name || !address || !email || !phone) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  // VALIDACION 2: El correo debe tener @ y un dominio (ej: usuario@gmail.com)
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('El correo no es valido. Debe tener el formato: usuario@dominio.com');
    document.getElementById('email').focus();
    return;
  }

  // VALIDACION 3: El telefono debe tener solo numeros (8 a 12 digitos)
  var phoneRegex = /^[0-9]{8,12}$/;
  if (!phoneRegex.test(phone)) {
    alert('El telefono debe tener entre 8 y 12 digitos numericos. Ejemplo: 912345678');
    document.getElementById('phone').focus();
    return;
  }

  // Si todas las validaciones pasaron: construir pantalla de confirmacion
  var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  var totalPrice = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);

  var html = '<h4>Detalle del pedido:</h4>';
  cart.forEach(function(item) {
    html += '<div class="order-item">' +
              '<span>' + item.name + ' x' + item.quantity + '</span>' +
              '<span>$' + (item.price * item.quantity).toLocaleString('es-CL') + '</span>' +
            '</div>';
  });
  html += '<div class="order-total"><span>Total</span><span>$' + totalPrice.toLocaleString('es-CL') + '</span></div>';
  html += '<div class="order-info">Envio a: ' + address + '</div>';
  html += '<div class="order-info">Confirmacion enviada a: ' + email + '</div>';
  document.getElementById('order-details').innerHTML = html;

  // Mostrar pantalla de confirmacion
  document.getElementById('checkout-section').style.display     = 'none';
  document.getElementById('confirmation-section').style.display = 'flex';

  // Limpiar el carrito del Session Storage al completar la compra
  sessionStorage.removeItem('cart');
  updateCartDisplay();
}
