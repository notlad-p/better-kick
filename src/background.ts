const tabs = browser.tabs || chrome.tabs;

const runtime = browser.runtime || chrome.runtime;

runtime.onUpdateAvailable.addListener(function(details) {
  console.log(details);
  // console.log("updating to version " + details.version);
  // runtime.reload();
});

runtime.onInstalled.addListener(function(details) {
  console.log("INSTALL DETAILS: ", details);
});

tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.url) {
    // TODO: remove all url logic from here & just send message with url
    const url = new URL(changeInfo.url);
    // if (changeInfo.status === "complete") {
    //   console.log("URL: ", changeInfo.url);
    // }

    if (url.hostname === "kick.com") {
      // if (url.hostname === "kick.com" && url.pathname === "/") {
      console.log("MAIN NAVIGATION COMPLETE");
      console.log(changeInfo);
      if (url.pathname.includes("/video/")) {
        console.log("VODS NAVIGATION COMPLETE");
        tabs.sendMessage(_tabId, {
          message: "navigation",
          vod: true,
          url: changeInfo.url,
        });
      } else {
        tabs.sendMessage(_tabId, {
          message: "navigation",
          vod: false,
          url: changeInfo.url,
        });
      }
    }
  }
});


browser.permissions.onAdded.addListener((permissions) => {
  console.log("Permissions changed", permissions);
})
