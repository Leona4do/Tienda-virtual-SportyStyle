// ============================================================
// js/products.js  -  Productos y Carrito con Session Storage
// ============================================================

// Lista de los 9 productos de la tienda (3 por categoria)
var products = [
  // --- CAMISETAS ---
  { id: 1, category: 'Camisetas', name: 'Camiseta Running Pro',
    description: 'Camiseta de secado rapido, ideal para correr largas distancias.',
    price: 14990, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwPsV2y-2Mwcmp62DOLyydNRyMHndjZITgw&s' },
  { id: 2, category: 'Camisetas', name: 'Camiseta Gym Flex',
    description: 'Camiseta elastica perfecta para entrenamientos de alta intensidad.',
    price: 12990, image: 'https://s.alicdn.com/@sc04/kf/H286fd41643a947d2b8213db48aebf7fb3/Janya-Breathable-Quick-Dry-Seamless-Short-Sleeve-Compressed-Bodybuilding-Fitness-Athletic-Jersey-Training-Muscle-T-Shirt-for-Men.jpg' },
  { id: 3, category: 'Camisetas', name: 'Camiseta Trail Sport',
    description: 'Diseno ligero y transpirable para actividades al aire libre.',
    price: 16990, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=200&fit=crop' },

  // --- PANTALONES ---
  { id: 4, category: 'Pantalones', name: 'Pantalon Jogger Elite',
    description: 'Comodo pantalon con bolsillos laterales y elastico ajustable.',
    price: 22990, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIcQtm9E7NIYefFG9f9sjb-PcQXuuNhYemLw&s' },
  { id: 5, category: 'Pantalones', name: 'Shorts Deportivo Dry',
    description: 'Shorts de secado rapido, ideales para el gimnasio.',
    price: 18990, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIgMhsKa2jhl7R1r20XIvhztLl-qhHvjzhA&s' },
  { id: 6, category: 'Pantalones', name: 'Pantalon de Compresion',
    description: 'Pantalon de compresion para mejor rendimiento y recuperacion muscular.',
    price: 24990, image: 'https://cdn.shopify.com/s/files/1/0763/2797/7258/files/62dfebb198070cd1bfc2a7f5c0bfc5a178eef38c_SHINCOMPTIGHT_1.jpg?v=1774627109' },

  // --- ACCESORIOS ---
  { id: 7, category: 'Accesorios', name: 'Guantes Gym Power',
    description: 'Guantes con agarre antideslizante y muñequera reforzada.',
    price: 8990, image: 'https://contents.mediadecathlon.com/p2832343/k$efa3342d40b108ce1a1e898b507c5555/guantes-musculacion-sujecion-muneca-agarre.jpg' },
  { id: 8, category: 'Accesorios', name: 'Banda de Resistencia',
    description: 'Set de 3 bandas elasticas para entrenamiento funcional.',
    price: 11990,image: 'https://cdnx.jumpseller.com/leon-import/image/34232426/resize/908/908?1681838146' },
  { id: 9, category: 'Accesorios', name: 'Botella Sport 750ml',
    description: 'Botella termica que mantiene tu bebida fria por 12 horas.',
    price: 9990, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop' }
];

// Mostrar los productos en la pagina agrupados por categoria
function renderProducts() {
  var container = document.getElementById('products-container');
  container.innerHTML = '';
  var categorias = ['Camisetas', 'Pantalones', 'Accesorios'];

  categorias.forEach(function(cat) {
    var catProducts = products.filter(function(p) { return p.category === cat; });

    var titulo = document.createElement('h3');
    titulo.className = 'category-title';
    titulo.textContent = cat;
    container.appendChild(titulo);

    var grid = document.createElement('div');
    grid.className = 'product-grid';

    catProducts.forEach(function(p) {
      var card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML =
        '<img src="' + p.image + '" alt="' + p.name + '">' +
        '<h4>' + p.name + '</h4>' +
        '<p>' + p.description + '</p>' +
        '<p class="price">$' + p.price.toLocaleString('es-CL') + '</p>' +
        '<button onclick="addToCart(' + p.id + ')">Agregar al carrito</button>';
      grid.appendChild(card);
    });
    container.appendChild(grid);
  });
}

// Agregar un producto al carrito y guardarlo en Session Storage
function addToCart(productId) {
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) return;

  // Leer carrito actual desde Session Storage (o array vacio si no existe)
  var cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  // Si ya existe, sumar cantidad; si no, agregar nuevo
  var existing = cart.find(function(item) { return item.id === productId; });
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  // Guardar carrito actualizado en Session Storage
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  showToast('"' + product.name + '" agregado al carrito');
}

// Cargar carrito al iniciar la pagina
function loadCart() {
  updateCartDisplay();
}

// Actualizar la vista del carrito con los datos de Session Storage
function updateCartDisplay() {
  var cart  = JSON.parse(sessionStorage.getItem('cart')) || [];
  var items = document.getElementById('cart-items');
  var count = document.getElementById('cart-count');
  var total = document.getElementById('cart-total');

  count.textContent = cart.reduce(function(s, i) { return s + i.quantity; }, 0);
  items.innerHTML   = '';
  var totalPrice    = 0;

  cart.forEach(function(item) {
    totalPrice += item.price * item.quantity;
    var div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML =
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-qty">Cantidad: ' + item.quantity + '</div>' +
      '</div>' +
      '<div class="cart-item-price">$' + (item.price * item.quantity).toLocaleString('es-CL') + '</div>';
    items.appendChild(div);
  });
  total.textContent = totalPrice.toLocaleString('es-CL');
}

// Mostrar u ocultar el panel del carrito
function toggleCart() {
  var panel = document.getElementById('cart-panel');
  panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
}

// Ir a la pantalla de pago
function goToCheckout() {
  var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  if (cart.length === 0) { showToast('Agrega productos al carrito primero'); return; }

  var summaryDiv = document.getElementById('cart-summary-checkout');
  var totalPrice = 0;
  var html = '<h3>Resumen de tu pedido:</h3>';
  cart.forEach(function(item) {
    totalPrice += item.price * item.quantity;
    html += '<div class="summary-item"><span>' + item.name + ' x' + item.quantity + '</span>' +
            '<span>$' + (item.price * item.quantity).toLocaleString('es-CL') + '</span></div>';
  });
  html += '<div class="summary-total"><span>Total</span><span>$' + totalPrice.toLocaleString('es-CL') + '</span></div>';
  summaryDiv.innerHTML = html;

  document.getElementById('products-section').style.display = 'none';
  document.getElementById('cart-panel').style.display       = 'none';
  document.getElementById('checkout-section').style.display = 'flex';
}

// Volver a la tienda desde cualquier pantalla
function backToProducts() {
  document.getElementById('products-section').style.display     = 'block';
  document.getElementById('checkout-section').style.display     = 'none';
  document.getElementById('confirmation-section').style.display = 'none';
  updateCartDisplay();
}

// Mostrar notificacion flotante
function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2500);
}
