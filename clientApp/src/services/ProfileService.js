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

  static selectByUserId(userId) {
    const url = `/api/profile/${userId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static update(data, userId) {
    const url = `/api/profile/${userId}`;
    const config = {
      method: "PUT",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default ProfileService;
