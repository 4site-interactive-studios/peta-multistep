import PetaMultistep from "./app/app";
import "./scss/main.scss";
//run();
window.PetaMultistep = PetaMultistep;
window.addEventListener("load", function () {
  // Set default options
  new window.PetaMultistep();
});

// Look for a div with the ID "pma-root-node". Whatch for changes to this div content. When it gets a new div with the class "peta-multistep" inside, run the multistep form.

const targetNode = document.querySelector("#pma-root-node");

if (targetNode) {
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        if (
          mutation.target.querySelector(".peta-multistep") &&
          "PetaMultistep" in window
        ) {
          window.setTimeout(function () {
            new window.PetaMultistep();
          }, 300);
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
