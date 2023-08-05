(async () => {
  let getURL;

  if (typeof browser.runtime.getURL === "function") {
    // Firefox
    getURL = browser.runtime.getURL;
  } else {
    // Chrome
    getURL = chrome.extension.getURL;
  }

  console.log("content.ts: loading modules")
  await import(getURL("modules.js"));
})();
