import axios from "axios";

class ProfileService {
  static create(data) {
    const url = "/api/profile";
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default ProfileService;
