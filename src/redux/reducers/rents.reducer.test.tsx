import { rentsContants } from 'redux/constants';
import rents from './rents.reducer';
import * as mocks from 'utils';

describe('books reducer', () => {
    const { rent, rentsMock } = mocks;

    test('should handle SET_ALL_RENTS', () => {
        const setAction = {
            type: rentsContants.SET_ALL_RENTS,
            rents: rentsMock,
        };
        expect(rents([], setAction)).toEqual(rentsMock);
    });

    test('should handle SET_RENT', () => {
        const setAction = {
            type: rentsContants.SET_RENT, rent
        };
        expect(rents([], setAction)).toEqual(rentsMock);
    });
})


