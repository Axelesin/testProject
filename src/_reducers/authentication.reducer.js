import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
    case userConstants.DELETE_SUCCESS:
      return {};
    case userConstants.GET_INFO_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.activeUser
      };
    case userConstants.UPDATE_USER:
      let newUserData = state.user;
      newUserData.firstName = action.payload.activeUser.firstName;
      newUserData.lastName = action.payload.activeUser.lastName;
      newUserData.username = action.payload.activeUser.username;
      return {
        ...state,
        user: newUserData,
        activeUser: action.payload.activeUser,
        loadingUpdate: false
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        loadingUpdate: true
      };
    default:
      return state
  }
}