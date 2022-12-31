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

  handlePriceChange() {
    const minPriceText = <HTMLElement>(
      document.querySelector(".filter-range__min")
    );
    const maxPriceText = <HTMLElement>(
      document.querySelector(".filter-range__max")
    );
    const minPriceInput = <HTMLInputElement>(
      document.querySelector(".range-min")
    );
    const maxPriceInput = <HTMLInputElement>(
      document.querySelector(".range-max")
    );

    minPriceInput.addEventListener("input", () => {
      minPriceText.textContent = currencySymbol + minPriceInput.value;
      view.filter.price.min = parseInt(minPriceInput.value);
    });
    maxPriceInput.addEventListener("input", () => {
      maxPriceText.textContent = currencySymbol + maxPriceInput.value;
      view.filter.price.max = parseInt(maxPriceInput.value);
    });

  }

  handleStockChange() {
    const minPriceText = <HTMLElement>(
      document.querySelectorAll(".filter-range__min")[1]
    );
    const maxPriceText = <HTMLElement>(
      document.querySelectorAll(".filter-range__max")[1]
    );
    const minPriceInput = <HTMLInputElement>(
      document.querySelectorAll(".range-min")[1]
    );
    const maxPriceInput = <HTMLInputElement>(
      document.querySelectorAll(".range-max")[1]
    );

    minPriceInput.addEventListener("input", () => {
      minPriceText.textContent = minPriceInput.value;
      view.filter.stock.min = parseInt(minPriceInput.value);
    });
    maxPriceInput.addEventListener("input", () => {
      maxPriceText.textContent = maxPriceInput.value;
      view.filter.stock.max = parseInt(maxPriceInput.value);
    });
  }

  run(): void {
    this.model.getFilterSection();
    this.setCheckboxListener();
    this.handlePriceChange();
    this.handleStockChange();
  }
}
