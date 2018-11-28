import axios from "axios";

class NutritionService {
  static searchFood(input) {
    const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${input}`;
    const config = {
      method: "GET",
      headers: {
        "x-app-id": "dcc64572",
        "x-app-key": "1606b030afe30167ac2fd5236962fe31"
      }
    };
    axios.defaults.withCredentials = false;
    return axios(url, config);
  }

  static getNutrients(itemId) {
    const url = `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${itemId}`;
    const config = {
      method: "GET",
      headers: {
        "x-app-id": "dcc64572",
        "x-app-key": "1606b030afe30167ac2fd5236962fe31"
      }
    };
    axios.defaults.withCredentials = false;
    return axios(url, config);
  }
}

export default NutritionService;
