import onlineStoreData from "../../../data/onlineStoreData";
import { currencySymbol, view } from "../../utils/constants";
import { FiltersModel } from "./FiltersModel";
import { FiltersView } from "./FiltersView";

export class FiltersController {
  view: FiltersView;
  model: FiltersModel;
  data: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }[];

  constructor() {
    this.view = new FiltersView();
    this.model = new FiltersModel(
      this.view.generateFilterSection.bind(this.view),
      this.view.generateCheckboxItem.bind(this.view)
    );
    this.data = [...onlineStoreData];
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

      // view.isBig = true;
    });
  }

  copyUrlToClipboard() {
    this.view.copyLinkBtn!.addEventListener("click", () => {
      window.navigator.clipboard.writeText(window.location.href);
      this.view.copyLinkBtn!.classList.add("filter-section__copy_active");
    });
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

  update() {
    this.view.copyLinkBtn!.classList.remove("filter-section__copy_active");

    this.updateFilterList(true);
    this.updateFilterList(false);

    this.updateRangeList(true);
    this.updateRangeList(false);
  }

  updateFilterList(isCategory: boolean) {
    const query = isCategory ? "category" : "brand";
    const container = <HTMLElement>document.querySelector(`#${query}-checkbox`);
    const items = <NodeListOf<HTMLElement>>(
      container.querySelectorAll(".checkbox-item")
    );
    items.forEach((item) => {
      const label = <HTMLLabelElement>(
        item.querySelector(".checkbox-item__label")
      );
      const spanList = <NodeListOf<HTMLSpanElement>>(
        item.querySelectorAll(".checkbox-item__span")
      );
      const filterItemsFound =
        view.filterList[query][<string>label.textContent];
      if (filterItemsFound) {
        item.classList.remove("checkbox-item_disabled");
        spanList[0].textContent = `(${filterItemsFound}/`;
      } else {
        item.classList.add("checkbox-item_disabled");
        spanList[0].textContent = "(0/";
      }
    });
  }

  updateRangeList(isPrice: boolean) {
    const query = isPrice ? "price" : "stock";
    const container = <HTMLElement>(
      document.querySelector(`.filter-range-${query}`)
    );
    const rangeMinText = <HTMLElement>(
      container.querySelector(".filter-range__min")
    );
    const rangeMaxText = <HTMLElement>(
      container.querySelector(".filter-range__max")
    );

    const rangeMinInput = <HTMLInputElement>(
      container.querySelector(".range-min")
    );
    const rangeMaxInput = <HTMLInputElement>(
      container.querySelector(".range-max")
    );

    const minRange = view.filterList[query].min;
    const maxRange = view.filterList[query].max;

    const desc = <HTMLElement>container.querySelector(".filter-range__desc");
    const wrapper = <HTMLElement>container.querySelector(".input-wrapper");
    const warning = <HTMLElement>(
      container.querySelector(".filter-range__warning")
    );

    if (view.itemsFound) {
      desc.classList.remove("filter-range__desc_disabled");
      wrapper.classList.remove("input-wrapper_disabled");
      warning.classList.remove("filter-range__warning_disabled");
    } else {
      desc.classList.add("filter-range__desc_disabled");
      wrapper.classList.add("input-wrapper_disabled");
      warning.classList.add("filter-range__warning_disabled");
    }

    if (minRange) {
      rangeMinText.textContent = `${isPrice ? currencySymbol : ""}${minRange}`;
      rangeMinInput.value = minRange!.toString();
    }
    if (maxRange) {
      rangeMaxText.textContent = `${isPrice ? currencySymbol : ""}${maxRange}`;
      rangeMaxInput.value = maxRange!.toString();
    }
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
