import axios from "axios";

class FoodService {
  static create(data) {
    const url = "/api/food";
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default FoodService;
