import onlineStoreData from "../../../data/data";
import { sortOptionsList } from "../../utils/constants";
import { view } from "../../utils/constants";

export class DisplayBardModel {
  generateSection: Function;
  handleViewBig: Function;
  handleViewSmall: Function;
  updateFoundItemsNum: Function;

  constructor(
    generateSection: Function,
    handleViewBig: Function,
    handleViewSmall: Function,
    updateFoundItemsNum: Function,
  ) {
    this.generateSection = generateSection;
    this.handleViewBig = handleViewBig;
    this.handleViewSmall = handleViewSmall;
    this.updateFoundItemsNum = updateFoundItemsNum;
  }

  handleCardViewChange(event?: Event): void {
    let button, buttonId: string;

    if(event) {
      button = <HTMLButtonElement>event!.target;
      buttonId = <string>button.getAttribute("id");
    } else {
      button = <HTMLButtonElement>document.querySelector('#view-big');
      buttonId = "view-big"
    }

    if (buttonId === "view-small") {
      this.handleViewSmall();
    } else {
      this.handleViewBig();
    }

    button.setAttribute("disabled", "");
    button.setAttribute("checked", "");

    view.isBig = !view.isBig;
    view.default = false;
  }

  updateItemsNum() {
    this.updateFoundItemsNum(view.itemsFound);
  }

  getDisplayBar(): void {
    view.itemsFound = onlineStoreData.length;
    this.generateSection(view.itemsFound, sortOptionsList);
  }
}
