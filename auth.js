// ============================================================
// js/auth.js  -  Autenticacion con Auth0
//
// PASO IMPORTANTE: Reemplaza los dos valores de abajo con
// los de tu cuenta Auth0. Los encuentras en:
//   Auth0 > Applications > SportyStyle > Settings
// ============================================================

const AUTH0_DOMAIN    = 'dev-u851ubocfdtrv7ig.us.auth0.com';   // Ej: dev-abc123.us.auth0.com
const AUTH0_CLIENT_ID = 'bDtQ4hgZgPKDsmnGfbvoppUqYnLE9Ttz';            // Cadena larga de letras y numeros

let auth0Client = null;

// Inicializar Auth0 cuando carga la pagina
window.addEventListener('load', async () => {
  try {
    auth0Client = await auth0.createAuth0Client({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin + window.location.pathname
      }
    });

    // Si el usuario regresa desde el login de Auth0
    if (location.search.includes('code=') && location.search.includes('state=')) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    await updateUI();
    renderProducts();
    loadCart();

  } catch (error) {
    console.error('Error al inicializar Auth0:', error);
  }
});

// Iniciar sesion: redirige a la pantalla de Auth0
async function loginUser() {
  try {
    await auth0Client.loginWithRedirect();
  } catch (error) {
    console.error('Error al iniciar sesion:', error);
  }
}

// Cerrar sesion: limpia el carrito y redirige
async function logoutUser() {
  sessionStorage.clear();
  try {
    await auth0Client.logout({
      logoutParams: { returnTo: window.location.origin + window.location.pathname }
    });
  } catch (error) {
    console.error('Error al cerrar sesion:', error);
  }
}

// Actualizar la interfaz segun si el usuario esta autenticado o no
async function updateUI() {
  try {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const btnLogin   = document.getElementById('btn-login');
    const btnLogout  = document.getElementById('btn-logout');
    const welcomeMsg = document.getElementById('welcome-msg');

    if (isAuthenticated) {
      const user = await auth0Client.getUser();
      btnLogin.style.display   = 'none';
      btnLogout.style.display  = 'inline-block';
      welcomeMsg.textContent   = 'Bienvenido/a, ' + user.name + '!';
    } else {
      btnLogin.style.display   = 'inline-block';
      btnLogout.style.display  = 'none';
      welcomeMsg.textContent   = '';
    }
  } catch (error) {
    console.error('Error al actualizar la interfaz:', error);
  }
}
