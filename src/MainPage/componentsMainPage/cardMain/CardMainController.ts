import { productsInCartInfo } from "../../../services/appServices";
import { CardMainModel } from "./CardMainModel";
import { CardMainView } from "./CardMainView";

export class CardMainController {
  view: CardMainView;
  model: CardMainModel;

  constructor() {
    this.view = new CardMainView();
    this.model = new CardMainModel(
      this.view.getCardTemplate,
      this.view.getCardListTemplate.bind(this.view),
      this.view.updateCardsView.bind(this.view),
      this.view.refreshCardList.bind(this.view),
      this.view.handleAddBtnState.bind(this.view)
    );
  }

  addToCart(): void {
    const addButtonList = document.querySelectorAll(".card__add-button");

    addButtonList.forEach((item) => {
      item.addEventListener("click", (event: Event) => {
        const target = <HTMLElement>event.target;
        this.model.handleAddBtn(target);
      });
    });
  }

  public run(): void {
    this.model.getCardList();
    this.addToCart();
  }

  update(): void {
    this.model.updateCardsList();
    this.addToCart();
  }
}
