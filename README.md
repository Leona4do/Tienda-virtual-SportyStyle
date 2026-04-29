# SportyStyle - Tienda Virtual Deportiva

Mini aplicacion web de tienda deportiva con autenticacion Auth0 y carrito con Session Storage.

## Flujo de Autenticacion con Auth0
1. El usuario hace clic en "Iniciar Sesion"
2. Es redirigido al servicio Auth0 (login universal)
3. Ingresa sus credenciales en Auth0
4. Auth0 valida y redirige de vuelta a la tienda con la sesion activa
5. Se muestra el nombre del usuario en la barra de navegacion

## Proceso de Seleccion de Productos
- Los productos estan definidos en js/products.js como un array de objetos
- Se muestran agrupados por categoria: Camisetas, Pantalones y Accesorios
- Al hacer clic en "Agregar al carrito", el producto se guarda en Session Storage
- Si el producto ya existe en el carrito, se incrementa la cantidad automaticamente

## Proteccion de la Sesion con Session Storage
- Session Storage almacena el carrito mientras el navegador este abierto
- Los datos se borran automaticamente al cerrar la pestana o ventana
- Al cerrar sesion (logout) se ejecuta sessionStorage.clear() para limpiar el carrito
- Al completar una compra se ejecuta sessionStorage.removeItem('cart')

## Como ejecutar
1. Clonar el repositorio: git clone [URL-DEL-REPOSITORIO]
2. Abrir la carpeta SportyStyle en Visual Studio Code
3. Clic derecho sobre index.html > Open with Live Server
4. La tienda se abre en: http://localhost:5500

## Configuracion necesaria en Auth0
En el archivo js/auth.js reemplaza:
- AUTH0_DOMAIN con tu dominio (ejemplo: dev-abc123.us.auth0.com)
- AUTH0_CLIENT_ID con tu Client ID de Auth0
