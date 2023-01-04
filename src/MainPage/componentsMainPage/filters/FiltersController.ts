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
    const filter = <HTMLElement>document.querySelector(".filter-range-price");
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );
    const rangeInputMin = <HTMLInputElement>filter.querySelector(".range-min");
    const rangeInputMax = <HTMLInputElement>filter.querySelector(".range-max");
    const range = <HTMLElement>filter.querySelector(".slider .progress");
    let priceGap = 10;

    const minPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__min")
    );
    const maxPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__max")
    );

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        const target = <HTMLElement>e.target;
        let minVal = parseInt(rangeInputMin.value),
          maxVal = parseInt(rangeInputMax.value);

        if (maxVal - minVal < priceGap) {
          if (target.className === "range-min") {
            rangeInputMin.value = (maxVal - priceGap).toString();
            view.filter.price.min = Number(rangeInputMin.value);
          } else {
            rangeInputMax.value = (minVal + priceGap).toString();
            view.filter.price.max = Number(rangeInputMax.value);
          }
        } else {
          minPriceText.textContent = `${minVal}${currencySymbol}`;
          maxPriceText.textContent = `${maxVal}${currencySymbol}`;
          range.style.left = (minVal / parseInt(rangeInputMin.max)) * 100 + "%";
          range.style.right =
            100 - (maxVal / parseInt(rangeInputMax.max)) * 100 + "%";

          view.filter.price.min = minVal;
          view.filter.price.max = maxVal;
        }
      });
    });
  }

  handleStockChange() {
    const filter = <HTMLElement>document.querySelector(".filter-range-stock");
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );
    const rangeInputMin = <HTMLInputElement>filter.querySelector(".range-min");
    const rangeInputMax = <HTMLInputElement>filter.querySelector(".range-max");
    const range = <HTMLElement>filter.querySelector(".slider .progress");
    let priceGap = 10;

    const minPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__min")
    );
    const maxPriceText = <HTMLElement>(
      filter.querySelector(".filter-range__max")
    );

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        const target = <HTMLElement>e.target;
        let minVal = parseInt(rangeInputMin.value),
          maxVal = parseInt(rangeInputMax.value);

        if (maxVal - minVal < priceGap) {
          if (target.className === "range-min") {
            rangeInputMin.value = (maxVal - priceGap).toString();
            view.filter.price.min = Number(rangeInputMin.value);
          } else {
            rangeInputMax.value = (minVal + priceGap).toString();
            view.filter.price.max = Number(rangeInputMax.value);
          }
        } else {
          minPriceText.textContent = minVal.toString();
          maxPriceText.textContent = maxVal.toString();
          range.style.left = (minVal / parseInt(rangeInputMin.max)) * 100 + "%";
          range.style.right =
            100 - (maxVal / parseInt(rangeInputMax.max)) * 100 + "%";

          view.filter.stock.min = minVal;
          view.filter.stock.max = maxVal;
        }
      });
    });
  }

  run(): void {
    this.model.getFilterSection();
    this.setCheckboxListener();
    this.handlePriceChange();
    this.handleStockChange();
  }
}
