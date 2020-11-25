import { rentsContants } from 'redux/constants';
import { IRent, IRents } from 'models';

export const setAllRents = (rents: IRents) => ({
  type: rentsContants.SET_ALL_RENTS,
  rents
})

export const setRent = (rent: IRent) => ({
  type: rentsContants.SET_RENT,
  rent,
})

export const setDeletedRent = (rentId: string) => ({
  type: rentsContants.DELETE_RENT,
  rentId,
});

export const rentsActions = {
  setAllRents,
  setDeletedRent,
  setRent
};







