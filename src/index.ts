import "../src/styles/main.scss";
import AppController from "./AppController";
const appController = new AppController();
appController.run();

let displayBarObserver = new MutationObserver(() => {
  appController.update();
});

const displayBar = <Node>document.querySelector(".display-bar");
displayBarObserver.observe(displayBar, {
  childList: true,
  subtree: true,
  characterDataOldValue: true,
  attributes: true,
});
