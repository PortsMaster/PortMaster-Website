import { isTokenValid, redirectToIDP, getCookie,renewAccessToken } from './auth.js';

window.addEventListener("DOMContentLoaded", () => {
  const hasSession = getCookie("sessionid");

  if (!hasSession) { 
    redirectToIDP();
    return;
  }
  
  if (!isTokenValid() && hasSession) {
    renewAccessToken();
    return;
  }

});