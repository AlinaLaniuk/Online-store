import onlineStoreData from "../../../data/data";
import { currencySymbol, view } from "../../utils/constants";
import { FiltersModel } from "./FiltersModel";
import { FiltersView } from "./FiltersView";

export class FiltersController {
  view: FiltersView;
  model: FiltersModel;

  constructor() {
    this.view = new FiltersView();
    this.model = new FiltersModel(
      this.view.generateFilterSection.bind(this.view),
      this.view.generateCheckboxItem.bind(this.view)
    );
  }

  setCheckboxListener() {
    const checkboxList = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(".checkbox-item__input")
    );

    checkboxList.forEach((item: HTMLInputElement) => {
      item.addEventListener("input", () => this.model.addFilter(item));
    });
  }

  resetRangeFilter(isPrice: boolean) {
    const rangeType = isPrice ? "price" : "stock";
    const filter = <HTMLElement>(
      document.querySelector(`.filter-range-${rangeType}`)
    );
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );
    rangeInput[0].value = view.filter[rangeType].min.toString();
    rangeInput[1].value = view.filter[rangeType].max.toString();
    rangeInput.forEach((item) => {
      this.model.updateInputRange(item, filter, isPrice);
    });
  }

  resetFilters() {
    const resetFiltersBtn = <HTMLButtonElement>(
      document.querySelector(".filter-section__reset")
    );
    resetFiltersBtn.addEventListener("click", () => {
      this.model.resetFilters();
      this.model.getPriceRange(onlineStoreData.slice());
      this.model.getStockRange(onlineStoreData.slice());

      this.resetRangeFilter(true);
      this.resetRangeFilter(false);
      view.default = true;
      view.search = "";
      const searchBar = <HTMLInputElement>(
        document.querySelector(".display-bar__search-bar")
      );
      searchBar!.value = "";

      const sortBar = <HTMLSelectElement>(
        document.querySelector(".display-bar__sort-bar")
      );

      view.sort.key = "id";
      view.sort.direction = "asc";

      sortBar!.removeAttribute("value");
      sortBar!.selectedIndex = 0;

      view.isBig = true;
    });
  }

  copyUrlToClipboard() {
    this.view.copyLinkBtn?.addEventListener("click", () =>
    window.navigator.clipboard.writeText(window.location.href)
    );
  }

  handleRangeChange(isPrice: boolean) {
    const rangeType = isPrice ? "price" : "stock";
    const filter = <HTMLElement>(
      document.querySelector(`.filter-range-${rangeType}`)
    );
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );

    rangeInput.forEach((input) => {
      input.addEventListener("input", (event) => {
        const target = <HTMLElement>event.target;
        this.model.updateInputRange(target, filter, isPrice);
      });
    });
  }

  run(): void {
    this.model.getFilterSection();
    this.setCheckboxListener();
    this.handleRangeChange(true);
    this.handleRangeChange(false);
    this.resetFilters();
    this.copyUrlToClipboard();
  }
}
