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
    const filter = <HTMLElement>document.querySelector('.filter-range-price');

    const minPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__min")
    );
    const maxPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__max")
    );
    const minPriceInput = <HTMLInputElement>(
      filter.querySelector(".range-min")
    );
    const maxPriceInput = <HTMLInputElement>(
      filter.querySelector(".range-max")
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
    const filter = <HTMLElement>document.querySelector('.filter-range-stock');

    const minPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__min")
    );
    const maxPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__max")
    );
    const minPriceInput = <HTMLInputElement>(
      filter.querySelector(".range-min")
    );
    const maxPriceInput = <HTMLInputElement>(
      filter.querySelector(".range-max")
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
