self.addEventListener("install", (event) => {
  console.log("Установлен");

  event.waitUntil(
    caches.open("localhost-cache").then((cache) => {
      cache.addAll([
        "./",
        "./index.html",
        "./app.css",
        "./app.js",
        "./bf8dfa7cc601f56bb8b1.png",
      ]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Активирован");
});

async function cachePriorityThenFetch(event) {
  const cacheResponse = await caches.match(event.request);

  if (cacheResponse) {
    return cacheResponse;
  }

  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    return;
  }

  const cache = await caches.open("localhost-cache");

  cache.put(event.request, response.clone());

  return response;
}

async function fetchPriorityThenCache(event) {
  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    console.log(error);
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }
    const body = {
      status: false,
      timestamp: Date.now(),
      text: "Нет соединения",
    };
    const options = { status: 503, statusText: "Service Unavailable" };
    return new Response(JSON.stringify(body), options);
  }

  // const cache = await caches.open('localhost-cache');

  // cache.put(event.request, response.clone());

  return response;
}

self.addEventListener("fetch", (event) => {
  console.log("Происходит запрос на сервер");
  // event.respondWith(cachePriorityThenFetch(event));
  event.respondWith(fetchPriorityThenCache(event));
});
