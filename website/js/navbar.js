import {logoutFromIDP,redirectToIDP,signupToIDP,getCookie } from '../auth/auth.js';

window.addEventListener("DOMContentLoaded", () => {
  const hasSession = getCookie("sessionid");

  if (!hasSession) {
    document.getElementById("_login").onclick = function() { redirectToIDP();}
    document.getElementById("_signup").onclick = function() { signupToIDP()();}
    document.getElementById("signup").style.display = 'block';
    document.getElementById("login").style.display = 'block';
    return;
  }
  else {
    document.getElementById("_logout").onclick = function() { logoutFromIDP();}
    document.getElementById("logout").style.display = 'block';
    return;
  }
});


