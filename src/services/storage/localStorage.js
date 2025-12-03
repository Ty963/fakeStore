const AUTH_TOKEN_KEY = 'auth-token';

// Auth JWT management

export function saveToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function hasToken() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}