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
    this.view.mainWrapper!.addEventListener("click", (event: Event) => {
      const target = <HTMLElement>event.target;
      this.model.handleAddBtn(target);
    });
  }

  // seeProductDetails(): void {
  //   this.view.mainWrapper!.addEventListener("click", (event: Event) => {
  //     const target = <HTMLElement>event.target;
  //     this.model.handleDetailsBtn(target);
  //   });
  // }

  public run(): void {
    this.model.getCardList();
    this.addToCart();
    // this.seeProductDetails();
  }

  update(): void {
    this.model.updateCardsList();
    this.addToCart();
    // this.seeProductDetails();
  }
}
