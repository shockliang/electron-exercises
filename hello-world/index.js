const electorn = require("electron");
const remote = electorn.remote;

document.getElementById("close-button").addEventListener("click", function(e) {
  const window = remote.getCurrentWindow();
  window.close();
});
