//export const isAuthenticated = () => true;

import { useHistory } from 'react-router-dom';
export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export function logoff() {
  console.log("vai deslogar")
  localStorage.removeItem(TOKEN_KEY);

};
