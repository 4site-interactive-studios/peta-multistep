import PetaMultistep from "./app/app";
import "./scss/main.scss";
//run();
window.PetaMultistep = PetaMultistep;
window.addEventListener("load", function () {
  // Set default options
  new window.PetaMultistep();
});
