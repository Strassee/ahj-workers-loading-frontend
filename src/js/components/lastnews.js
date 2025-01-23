import News from "./news";

export default class LastNews {
  constructor() {
    this.newsArray = [];
    this.parent = document.querySelector(".news");
    // this.host = "http://localhost:7070/";
    this.host = "https://ahj-workers-loading-backend.onrender.com/";
    this.init();
  }

  static get noConnection() {
    return `
      <div class="no-connection">
        <div class="no-connection-message">Failed to load data. <br/> Check your connection and refresh the page.</div>
      </div>
    `;
  }

  init() {
    const callback = async (response) => {
      const result = await response.json();
      if (response.status >= 200 && response.status < 300) {
        this.newsArray = result.news;
        this.render();
      } else if (response.status === 503) {
        this.serviceUnavailable();
      }
    };
    this.sendRequest("GET", callback);
  }

  async sendRequest(method, callback = () => {}, body = false) {
    const response = fetch(this.host + "news/", {
      method: method,
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      if(body) {
        body;
      },
    });
    callback(await response);
  }

  render() {
    this.parent.textContent = "";
    this.newsArray.forEach((item) => {
      new News(item, this.parent).renderNews();
    });
  }

  serviceUnavailable() {
    this.parent.insertAdjacentHTML("afterbegin", LastNews.noConnection);
    this.noConnection = document.querySelector(".no-connection");
    this.noConnection.style.display = "flex";
  }
}
