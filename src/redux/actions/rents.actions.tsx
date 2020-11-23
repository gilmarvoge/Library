import { rentsContants } from 'redux/constants';
import { IRent } from 'models';

export const getAllRents = () => ({
  type: rentsContants.GET_BOOKS_RENT,
})

export const addRent = (rent: IRent) => ({
  type: rentsContants.ADD_BOOK_RENT,
  rent,
})

export const deleteRentByBookId = (book_id: string) => ({
  type: rentsContants.DELETE_BOOK_RENT,
  book_id,
});

export const rentsActions = {
  getAllRents,
  deleteRentByBookId,
  addRent
};







