import axios from "axios";

class UserService {
  static register(data) {
    const url = "/api/account/register";
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static login(userName, password) {
    const url = "/token";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: `grant_type=password&username=${userName}&password=${password}`
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default UserService;
