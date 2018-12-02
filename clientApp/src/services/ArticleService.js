import axios from "axios";

class ArticleService {
  static getArticles() {
    const url = "/api/article";
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default ArticleService;
