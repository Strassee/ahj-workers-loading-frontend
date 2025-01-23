import moment from "moment";

export default class News {
  constructor(news, parent) {
    this.id = news.id;
    this.img = news.img;
    this.subject = news.subject;
    this.body = news.body;
    this.received = news.received;
    this.parent = parent;
  }

  renderNews() {
    this.divNews = document.createElement("div");
    this.divNews.classList.add("news-item");

    this.divNewsHead = document.createElement("div");
    this.divNewsHead.classList.add("news-head");

    this.divNewsTitle = document.createElement("div");
    this.divNewsTitle.classList.add("news-title");
    this.divNewsTitle.textContent = this.subject;

    this.divNewsTime = document.createElement("div");
    this.divNewsTime.classList.add("news-time");
    this.divNewsTime.textContent = moment(this.received).format(
      "HH:mm DD.MM.YY",
    );

    this.divNewsHead.append(this.divNewsTitle);
    this.divNewsHead.append(this.divNewsTime);

    this.divNewsContent = document.createElement("div");
    this.divNewsContent.classList.add("news-content");

    this.divNewsImg = document.createElement("div");
    this.divNewsImg.classList.add("news-image");
    this.tagImg = document.createElement("img");
    this.tagImg.src = this.img;
    this.divNewsImg.append(this.tagImg);

    this.divNewsBody = document.createElement("div");
    this.divNewsBody.classList.add("news-body");
    this.divNewsBody.textContent = this.body;

    this.divNewsContent.append(this.divNewsImg);
    this.divNewsContent.append(this.divNewsBody);

    this.divNews.append(this.divNewsHead);
    this.divNews.append(this.divNewsContent);
    this.parent.append(this.divNews);
  }
}
