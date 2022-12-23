import onlineStoreData from "../../../data/data";
import { sortOptionsList } from "../../utils/constants";

export class DisplayBardModel {
  generateSection: Function;
  handleViewBig: Function;
  handleViewSmall: Function;

  constructor(generateSection: Function, handleViewBig: Function, handleViewSmall: Function) {
    this.generateSection = generateSection;
    this.handleViewBig = handleViewBig;
    this.handleViewSmall = handleViewSmall;
  }

  handleCardViewChange(event: Event): void {
    const button = <HTMLButtonElement>event.target;
    let buttonId: string = <string>button.getAttribute("id");

    const cardList = <HTMLElement>(
      document.querySelector(".card-list")
    );

    if (buttonId === "view-small") {
      this.handleViewSmall(cardList);
    } else {
      this.handleViewBig(cardList);
    }

    button.setAttribute("disabled", "");
    button.setAttribute("checked", "");
  }

  getDisplayBar(): void {
    this.generateSection(onlineStoreData.length, sortOptionsList);
  }
}
