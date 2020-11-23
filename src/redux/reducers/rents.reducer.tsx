import { rentsContants } from "../constants";
import {rents as initialRents} from 'services/mocks'

const rents = (state = initialRents, action: any = {}) => {
  switch (action.type) {
    case rentsContants.ADD_BOOK_RENT:
      return [...state, action.rent];
    case rentsContants.DELETE_BOOK_RENT:
      const newState = state.filter(rent => {      
        return rent.book_id !== action.book_id
      });
      return [...newState]
    default:
      return state
  }
}

export default rents;