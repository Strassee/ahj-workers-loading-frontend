import LastNews from "./components/lastnews";

const btnRefresh = document.querySelector(".btn-refresh");

new LastNews();

btnRefresh.addEventListener("click", (e) => {
  location.reload();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    // .register("../service-worker.js", { scope: "./" })
    .register("https://strassee.github.io/ahj-workers-loading-frontend/service-worker.js", { scope: "./" })
    .then((reg) => {
      // регистрация сработала
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch((error) => {
      // регистрация прошла неудачно
      console.log("Registration failed with " + error);
    });
}
