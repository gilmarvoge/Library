import * as actions from 'redux/actions';
import { rentsContants } from 'redux/constants';
import * as mocks from 'utils';

describe('actions rents', () => {
  const { rent, rentId, rents } = mocks;

  test('should create an action to set books', () => {
    const addAction = {
      type: rentsContants.SET_ALL_RENTS, rents
    }
    expect(actions.setAllRents(rents)).toEqual(addAction)
  });

  test('should create an action to delete rent', () => {
    const deleteAction = {
      type: rentsContants.DELETE_RENT, rentId
    }
    expect(actions.setDeletedRent(rentId)).toEqual(deleteAction)
  });

  test('should create an action to set all', () => {
    const setAction = {
      type: rentsContants.SET_RENT, rent
    }
    expect(actions.setRent(rent)).toEqual(setAction)
  });
});


