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
}

export default UserService;
