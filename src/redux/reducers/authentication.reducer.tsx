import { userConstants } from "../constants";

const userState = {
  id: '',
};

const authentication = (state = userState, action: any = {}) => {
  let { user } = action;

  switch (action.type) {
    case userConstants.USER_SAVE:
      console.log('reducer save user ');
      return {
        user
      }

    case userConstants.USER_SIGNOUT:
      return {};
    default:     
      return state
  }
}

export default authentication;