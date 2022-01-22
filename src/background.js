console.log("heelo from bg");

function setContent(content) {
  chrome.storage.local.set({ content: content }, function () {
    console.log("Value is set to " + content);
  });
}

function getContent() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(["content"], function (result) {
      console.log("Value currently is " + result.content);

      resolve(result.content ?? "empty");
      return;
    });
  });
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "copy-all") {
    // getCurrentTabId().then((tabId) => {
    chrome.tabs.sendMessage(tab.id, { action: "copy-all" }, (allCode) => {
      setContent(allCode);
    });
    // });
  }
});

chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === "header-click") {
    alert("header click catched");
  }
});

async function getCurrentTabId() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("tab.id", tab.id);
  return tab.id;
}

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("welcome.html"),
    });
  }
});
