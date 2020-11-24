
export const TOKEN_KEY = "token";

export const getUserIdStorage = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const login = (id: string) => {
  localStorage.setItem(TOKEN_KEY, id);
};

export function logoff() {
  localStorage.removeItem(TOKEN_KEY);
};
