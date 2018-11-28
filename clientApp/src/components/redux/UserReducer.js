const UserReducer = (
  state = {
    isLoggedIn: false,
    token: ""
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: true,
        token: action.payload.access_token
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
