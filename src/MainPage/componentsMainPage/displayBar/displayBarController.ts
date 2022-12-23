import { view } from "../../utils/constants";
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
      this.view.updateFoundItemsNum.bind(this.view),
    );
  }

  setViewBar() {
    this.view.cardsViewButtons!.forEach((item): void => {
      item.addEventListener("click", (event: Event): void => {
        this.model.handleCardViewChange(event);
      });
    });
  }

  setSearchBar() {
    this.view.searchBar!.addEventListener("input", () => {
      view.search = this.view.searchBar!.value;
      this.view.searchBar!.setAttribute('value', this.view.searchBar!.value);
    });
  }

  update() {
    this.model.updateItemsNum();
  }

  run(): void {
    this.model.getDisplayBar();
    this.setViewBar();
    this.setSearchBar();
  }
}
