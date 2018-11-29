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
          return true;
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

// content type header and bearer w/ token
export function logoutUser() {
  return {
    type: "LOGOUT_USER",
    payload: axios
      .post("/api/account/logout", { withCredentials: true })
      .then(resp => {
        return true;
      })
      .catch(err => console.error(err))
  };
}
