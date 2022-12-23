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

  handleCardViewChange(event: Event): void {
    const button = <HTMLButtonElement>event.target;
    let buttonId: string = <string>button.getAttribute("id");

    if (buttonId === "view-small") {
      this.handleViewSmall();
    } else {
      this.handleViewBig();
    }

    button.setAttribute("disabled", "");
    button.setAttribute("checked", "");

    view.isBig = !view.isBig;
  }

  updateItemsNum() {
    this.updateFoundItemsNum(view.itemsFound);
  }

  getDisplayBar(): void {
    view.itemsFound = onlineStoreData.length;
    this.generateSection(view.itemsFound, sortOptionsList);
  }
}
