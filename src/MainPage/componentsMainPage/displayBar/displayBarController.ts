import { view } from "../../utils/constants";
import { debounce } from "../../utils/constants";
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
    this.view.searchBar!.setAttribute("value", this.view.searchBar!.value);
    view.search = this.view.searchBar!.value;
  }
  searchBarDebounced = debounce.run(() => this.setSearchBar(), 1000);

  setSortBar() {
    this.view.sortBar!.addEventListener("change", () => {
      const value = this.view.sortBar!.value.split(" ");

      if (value[0] === "discount") {
        value[0] = "discountPercentage";
      }

      this.view.sortBar!.setAttribute("value", this.view.sortBar!.value);

      view.sort.key = value[0];
      view.sort.direction = value[1];
    });
  }

  // update component
  updateSearchBar() {
    this.view.searchBar!.addEventListener("input", () => {
      this.searchBarDebounced();
    });
  }

  update() {
    this.model.updateItemsNum();

    if (view.sort.key === "id") {
      this.view.sortBar!.removeAttribute("value");
      this.view.sortBar!.selectedIndex = 0;
    }

    if(view.search === '') {
      this.view.searchBar!.value = '';
    }
  }

  getPresetBar() {
    this.view.sortBar!.value = `${view.sort.key} ${view.sort.direction.toUpperCase()}`;
    if (view.sort.key === "id") {
      this.view.sortBar!.removeAttribute("value");
      this.view.sortBar!.selectedIndex = 0;
    }
    if (view.sort.key === "discountPercentage") {
      this.view.sortBar!.value = `discount ${view.sort.direction.toUpperCase()}`;
    }
    this.view.searchBar!.value = view.search;
  }
  // run component
  run(): void {
    this.model.getDisplayBar();
    this.setViewBar();
    this.setSortBar();
    this.updateSearchBar();
    this.getPresetBar()
  }
}
