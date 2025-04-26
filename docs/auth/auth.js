// js/auth/handler.js

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict`;
}


export function isTokenValid() {
  const token = sessionStorage.getItem("access_token");
  const exp = parseInt(sessionStorage.getItem("access_token_exp"), 10);
  if (!token || isNaN(exp)) return false;
  const now = Math.floor(Date.now() / 1000);
  return (exp - now) >= MIN_VALIDITY_SECONDS;
}

export function generateNonce(length = 16) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

export function redirectToIDP() {
  const state = btoa(window.location.href);
  const nonce = generateNonce();

  const params = new URLSearchParams({
    response_type: 'token id_token',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    audience: AUDIENCE,
    scope: 'openid profile email',
    state: state,
    nonce: nonce
  });

  const authUrl = `${IDP_AUTH_URL}?${params.toString()}`;
  window.location.href = authUrl;
}

export function signupToIDP() {
  const state = btoa(window.location.href);
  const nonce = generateNonce();

  const params = new URLSearchParams({
    response_type: 'token id_token',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    audience: AUDIENCE,
    scope: 'openid profile email',
    state: state,
    nonce: nonce,
    screen_hint: "signup"
  });

  const authUrl = `${IDP_AUTH_URL}?${params.toString()}`;
  window.location.href = authUrl;
}

export function logoutFromIDP() {
  // Clear tokens from memory/cookies/storage
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token_exp');
  deleteCookie("sessionid");

  // Redirect to Auth0 logout endpoint to log out the session
  const returnTo = encodeURIComponent(window.location.origin + '/');
  const logoutUrl = `${IDP_DOMAIN}/logout?client_id=${CLIENT_ID}&returnTo=${returnTo}`;

  window.location.href = logoutUrl;
}

export function renewAccessToken() {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    const state = btoa(window.location.href);
    const nonce = generateNonce();

    const params = new URLSearchParams({
      response_type: 'token id_token',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      audience: AUDIENCE,
      scope: 'openid profile email',
      state: state,
      nonce: nonce,
      screen_hint: "signup",
      promt: "none"
    });

    iframe.src = `${IDP_AUTH_URL}?${params.toString()}`;

    const timeout = setTimeout(() => {
      //reject(new Error('Silent auth timed out'));
      redirectToIDP();
      //document.body.removeChild(iframe);
    }, 1); // 10 seconds timeout

    window.addEventListener('message', function handleResponse(event) {
      if (event.origin !== IDP_DOMAIN) return;

      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
      document.body.removeChild(iframe);

      const { access_token, id_token, error, error_description } = event.data;

      if (error) {
        //reject(new Error(`${error}: ${error_description}`));

      } else {
        // resolve({ access_token, id_token });
      }
    });

    document.body.appendChild(iframe);
  });
}

// Constants (can also be passed in dynamically if needed)
export const IDP_DOMAIN = 'https://dev-0yudoct153i5kzxm.us.auth0.com';
export const IDP_AUTH_URL = 'https://dev-0yudoct153i5kzxm.us.auth0.com/authorize';
export const CLIENT_ID = 'WXqxdHRusEb0FbxoUpBKMLTe6W4v7vRN';
export const AUDIENCE = 'https://suggestions.portmaster.games';
export const REDIRECT_URI = window.location.origin + '/auth/callback.html';
export const MIN_VALIDITY_SECONDS = 300; // 5 minutes
