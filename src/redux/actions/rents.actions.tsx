import { rentsContants } from 'redux/constants';
import { IRent, IRents } from 'models';

export const setAllRents = (rents: IRents) => ({
  type: rentsContants.SET_ALL_RENTS,
  rents
})

export const setRent = (rent: IRent) => ({
  type: rentsContants.ADD_RENT,
  rent,
})

export const setDeletedRent = (id: string) => ({
  type: rentsContants.DELETE_RENT,
  id,
});

export const rentsActions = {
  setAllRents,
  setDeletedRent,
  setRent
};







