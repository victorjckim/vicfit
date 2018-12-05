import axios from "axios";

class FileStorageService {
  static insertFileStorage(data, userId) {
    const url = `/api/filestorage/${userId}`;
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static selectByUserId(userId) {
    const url = `/api/filestorage/${userId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static update(data, id) {
    const url = `/api/filestorage/${id}`;
    const config = {
      method: "PUT",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default FileStorageService;
