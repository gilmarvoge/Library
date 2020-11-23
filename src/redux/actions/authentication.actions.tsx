import { userConstants } from '../constants';

const setUserState = ( id:string) => ({
  type: userConstants.USER_SAVE,
  id
});

const logoutUser = () => ({
  type: userConstants.USER_SIGNOUT, 
})

export const userActions = {
  setUserState,
  logoutUser
};
