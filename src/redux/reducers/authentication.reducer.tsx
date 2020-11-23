import { userConstants } from "../constants";

const userState = {
  id: '',
};

const authentication = (state = userState, action: any = {}) => {
  let { id } = action;
  switch (action.type) {
    case userConstants.USER_SAVE:
      return {
        id
      }
    case userConstants.USER_SIGNOUT:
      return {};
    default:
      return state
  }
}

export default authentication;