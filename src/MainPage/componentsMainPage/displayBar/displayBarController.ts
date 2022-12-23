import { DisplayBardModel } from "./displayBarModel";
import { DisplayBarView } from "./displayBarView";

export class DisplayBarController {
  view: DisplayBarView;
  model: DisplayBardModel;

  constructor() {
    this.view = new DisplayBarView();
    this.model = new DisplayBardModel(
      this.view.generateSection.bind(this.view)
    );
  }

  handleViewSmall(list: HTMLElement): void {
    list.classList.add("card-list_type_small");
    this.view.cardsViewButtons![0].removeAttribute("disabled");
    this.view.cardsViewButtons![0].removeAttribute("checked");
  }

  handleViewBig(list: HTMLElement) {
    list.classList.remove("card-list_type_small");
    this.view.cardsViewButtons![1].removeAttribute("disabled");
    this.view.cardsViewButtons![1].removeAttribute("checked");
  }

  handleCardViewChange(event: Event): void {
    const button = <HTMLButtonElement>event.target;
    let buttonId: string = <string>button.getAttribute("id");

    const cardList = <HTMLElement>(
      this.view.mainWrapper.querySelector(".card-list")
    );

    if (buttonId === "view-small") {
      this.handleViewSmall(cardList);
    } else {
      this.handleViewBig(cardList);
    }

    button.setAttribute("disabled", "");
    button.setAttribute("checked", "");
  }

  setViewBar() {
    this.view.cardsViewButtons!.forEach((item): void => {
      item.addEventListener("click", (event: Event): void => {
        this.handleCardViewChange(event);
      });
    });
  }

  run(): void {
    this.model.getDisplayBar();
    this.setViewBar();
  }
}
