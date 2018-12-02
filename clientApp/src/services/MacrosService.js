import axios from "axios";

class MacrosService {
  static create(userId, profileId) {
    const url = `/api/macros/${userId}/${profileId}`;
    const config = {
      method: "POST"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static getMacros(userId) {
    const url = `/api/macros/${userId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default MacrosService;
