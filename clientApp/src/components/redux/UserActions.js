import axios from "axios";

export function loginUser(userName, password) {
  const data = `grant_type=password&username=${userName}&password=${password}`;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  return {
    type: "LOGIN_USER",
    payload: axios
      .post("/token", data, { headers: headers, withCredentials: true })
      .then(resp => {
        sessionStorage.setItem("token", resp.data.access_token);
        return resp.data;
      })
      .catch(err => console.error(err))
  };
}

export function loginStatus(token) {
  const config = {
    Authorization: `Bearer ${token}`
  };
  return {
    type: "CHECK_LOGIN_STATE",
    payload: axios
      .get(`/api/account/userinfo`, { headers: config })
      .then(resp => {
        if (sessionStorage.getItem("token") !== null) {
          return resp.data;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error(err);
        return false;
      })
  };
}

export function getId(email) {
  return {
    type: "GET_USER_ID",
    payload: axios
      .get(`/api/users/getid?email=${email}`, { withCredentials: true })
      .then(resp => {
        sessionStorage.setItem("userId", resp.data.Item);
        return resp;
      })
      .catch(err => console.error(err))
  };
}

export function getMacros(userId) {
  return {
    type: "GET_USER_MACROS",
    payload: axios
      .get(`/api/macros/${userId}`, { withCredentials: true })
      .then(resp => {
        return resp.data;
      })
      .catch(err => console.error(err))
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_USER",
    payload: new Promise((resolve, reject) => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      setTimeout(() => {
        resolve(true);
      }, 500);
    })
  };
}
