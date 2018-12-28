import axios from "axios";

class ExerciseService {
  static create(data) {
    const url = "/api/exercise";
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static selectByUserId(userId, date) {
    const url = `/api/exercise/${userId}/${date}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static selectTotalByUserId(userId) {
    const url = `/api/exercise/${userId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static delete(exerciseId) {
    const url = `/api/exercise/${exerciseId}`;
    const config = {
      method: "DELETE"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default ExerciseService;
