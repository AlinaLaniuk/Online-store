import { DisplayBardModel } from "./displayBarModel";
import { DisplayBarView } from "./displayBarView";

export class DisplayBarController {
  view: DisplayBarView;
  model: DisplayBardModel;

  constructor() {
    this.view = new DisplayBarView();
    this.model = new DisplayBardModel(
      this.view.generateSection.bind(this.view),
      this.view.handleViewBig.bind(this.view),
      this.view.handleViewSmall.bind(this.view),
    );
  }

  setViewBar() {
    this.view.cardsViewButtons!.forEach((item): void => {
      item.addEventListener("click", (event: Event): void => {
        this.model.handleCardViewChange(event);
      });
    });
  }

  run(): void {
    this.model.getDisplayBar();
    this.setViewBar();
  }
}
