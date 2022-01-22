const body = document.querySelector("body");

const root = document.createElement("div");
root.style.position = "relative";

const shadowRoot = root.attachShadow({ mode: "open" });

const content = document.createElement("div");
content.id = "content";
shadowRoot.appendChild(content);

const cssUrl = chrome.runtime.getURL("content-script.css");
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssUrl;
content.appendChild(link);

const text = document.createElement("div");
text.id = "text";
text.innerText = "Raif extension!";
content.appendChild(text);

body.prepend(root);

text.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "header-click" });
});

chrome.runtime.onMessage.addListener((req, info, cb) => {
  if (req.action === "copy-all") {
    alert("copy-all");
    cb("command run");
  }
});
