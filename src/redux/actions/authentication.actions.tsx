import { userConstants } from '../constants';

const setUserState = (user:string) => ({
  type: userConstants.USER_SAVE,
  user
});

const logoutUser = () => ({
  type: userConstants.USER_SIGNOUT, 
})

export const userActions = {
  setUserState,
  logoutUser
};
