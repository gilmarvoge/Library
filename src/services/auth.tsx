//export const isAuthenticated = () => true;

import store from 'store';
import { userActions } from 'redux/actions';
export const TOKEN_KEY = "token";
export const isAuthenticated = () => {
  const id = localStorage.getItem(TOKEN_KEY) 
  if (id!== null){
    store.dispatch(userActions.setUserState(id));
    return true;
  }  
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (id: string) => {
  store.dispatch(userActions.setUserState(id));
  localStorage.setItem(TOKEN_KEY, id);
};
export function logoff() {
  store.dispatch(userActions.logoutUser());
  localStorage.removeItem(TOKEN_KEY);
};
