const UserReducer = (
  state = {
    isLoggedIn: false,
    userName: "",
    userId: ""
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName
      };
      break;
    case "CHECK_LOGIN_STATE_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload.Email ? true : false,
        userName: action.payload.Email
      };
      break;
    case "LOGOUT_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: false
      };
      break;
    case "GET_USER_ID_FULFILLED":
      state = {
        ...state,
        userId: action.payload.data.Item
      };
      break;
    default:
      return state;
  }
  return state;
};

export default UserReducer;
