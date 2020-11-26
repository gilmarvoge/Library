
import axios from 'axios';
import { IBook, IRent, IUser } from 'models';
import * as apiServices from 'services';

const api = axios.create({
  baseURL: 'https://5fbcdf9f3f8f90001638c61a.mockapi.io'
});

export const addUser = async (user: IUser) => {
  return await api.post(apiServices.userPath, user);
}

export const validateUser = async (user: string,) => {
  return await api.get(apiServices.userPath, { params: { user } });
}

export const getLogin = async (user: string, password: string) => {
  return await api.get(apiServices.userPath, { params: { user, password } })
}

export const getBooks = async () => {
  return await api.get(apiServices.bookPath);
}

export const addBook = async (book: IBook) => {
  return await api.post(apiServices.bookPath, book);
}

export const editBook = async (id: string, book: IBook) => {
  return await api.put(`${apiServices.bookPath}/${id}`, book);
}

export const deleteBook = async (id: string) => {
  return await api.delete(`${apiServices.bookPath}/${id}`);
}

export const getRents = async () => {
  return await api.get(apiServices.rentPath);
}

export const addRent = async (rent: IRent) => {
  return await api.post(apiServices.rentPath, rent);
}

export const deleteRent = async (id: string) => {
  return await api.delete(`${apiServices.rentPath}/${id}`);
}