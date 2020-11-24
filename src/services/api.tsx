
import axios from 'axios';
import * as api from "services";

export const fetchLogin = async (user:string, password:string) => {
  return axios.get(`${api.urlUsers}/?user=${user}&password=${password}`)
}

export const fetchBooks = async () => {
  return axios.get(api.urlBooks);
}