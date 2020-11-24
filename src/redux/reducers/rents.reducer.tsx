import { rentsContants } from "../constants";
import { IRent } from 'models';

const rents = (state = [], action: any = {}) => {
  switch (action.type) {
    case rentsContants.SET_ALL_RENTS:
      return [...action.rents];
    case rentsContants.ADD_RENT:
      return [...state, action.rent];
    case rentsContants.DELETE_RENT:
      const newState = state.filter((rent: IRent) => {
        return rent.id !== action.id
      });
      return [...newState]
    default:
      return state
  }
}

export default rents;