import routeListener from "../../observers/route";

const localExtensionStorage =
  typeof browser.storage.local.get === "function"
    ? browser.storage.local
    : chrome.storage.local;

const rememberVodTime = () => {
  routeListener.on("route.vod", (id: string) => {
    localExtensionStorage.get("vodPosition").then((data) => {
      console.log(data);
      const vodPosition = data[id];
      console.log(vodPosition);
      if (vodPosition) {
        // NOTE: how to get the video element?
        // - use player context with event emitter?
        //  - player context is better because it's not tied to a specific page
        //  -
        // - use page context with event emitter?
        //  - store url in page context (on 'navigation' event)
        //  - in page context, have 'vodDetected' event / function
        //
        //  - page context is better because it's not tied to a specific player
        // const video = document.querySelector("video");
        // if (video) {
        //   video.currentTime = vodPosition;
        // }
      }
    });
  });

  // TODO: LOOK THROUGH BTTV CODE FOR MORE IDEAS: https://github.com/night/betterttv/blob/aebd68d025a6b5cb36b427b40ad95817ff3ee196/src/watchers/routes.js#L141
  // Routes module?
  // - listens for navigation events with `navigation.on('navigation', (url) => {})`

  // const video = document.querySelector('video')
  // if (!video) return
  //
  // const vodTime = localStorage.getItem('vodTime')
  // if (vodTime) {
  //   video.currentTime = Number(vodTime)
  // }
  //
  // video.addEventListener('timeupdate', () => {
  //   localStorage.setItem('vodTime', String(video.currentTime))
  // })
};

export default rememberVodTime;
