const UserReducer = (
  state = {
    isLoggedIn: false
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: true
      };
      break;
    case "CHECK_LOGIN_STATE_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload
      };
      break;
    case "LOGOUT_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: false
      };
      break;
    default:
      return state;
  }
  return state;
};

export default UserReducer;
