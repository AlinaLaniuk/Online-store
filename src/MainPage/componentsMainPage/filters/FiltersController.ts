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
    const rangeType = isPrice ? 'price' : 'stock';
    const filter = <HTMLElement>(
      document.querySelector(`.filter-range-${rangeType}`)
    );
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );
    rangeInput[0].value = view.filter[rangeType].min.toString();
    rangeInput[1].value = view.filter[rangeType].max.toString();
    rangeInput.forEach((item) => {
      this.updateInputRange(item, filter, isPrice);
    });
  }

  resetFilters() {
    const resetFiltersBtn = <HTMLButtonElement>(
      document.querySelector(".filter-section__reset")
    );
    resetFiltersBtn.addEventListener("click", () => {
      this.model.resetFilters();
      this.model.getPriceRange(onlineStoreData);
      this.model.getStockRange(onlineStoreData);

      this.resetRangeFilter(true);
      this.resetRangeFilter(false);
    });
  }

  updateInputRange(target: HTMLElement, filter: HTMLElement, isPrice: boolean) {
    const rangeInputMin = <HTMLInputElement>filter.querySelector(".range-min");
    const rangeInputMax = <HTMLInputElement>filter.querySelector(".range-max");
    const range = <HTMLElement>filter.querySelector(".slider .progress");
    const inputType = isPrice ? 'price' : 'stock';
    let rangeGap = 10;

    const minText = <HTMLElement>(
      filter.querySelector(".filter-range__min")
    );
    const maxText = <HTMLElement>(
      filter.querySelector(".filter-range__max")
    );

    let minVal = parseInt(rangeInputMin.value),
      maxVal = parseInt(rangeInputMax.value);

    if (maxVal - minVal < rangeGap) {
      if (target.className === "range-min") {
        rangeInputMin.value = (maxVal - rangeGap).toString();
        view.filter[inputType].min = Number(rangeInputMin.value);
      } else {
        rangeInputMax.value = (minVal + rangeGap).toString();
        view.filter[inputType].max = Number(rangeInputMax.value);
      }
    } else {
      minText.textContent = `${minVal}${isPrice ? currencySymbol: ''}`;
      maxText.textContent = `${maxVal}${isPrice ? currencySymbol: ''}`;
      range.style.left = (minVal / parseInt(rangeInputMin.max)) * 100 + "%";
      range.style.right =
        100 - (maxVal / parseInt(rangeInputMax.max)) * 100 + "%";

      view.filter[inputType].min = minVal;
      view.filter[inputType].max = maxVal;
    }
  }

  handleRangeChange(isPrice: boolean) {
    const rangeType = isPrice ? 'price' : 'stock';
    const filter = <HTMLElement>document.querySelector(`.filter-range-${rangeType}`);
    const rangeInput = <NodeListOf<HTMLInputElement>>(
      filter.querySelectorAll(".range-input input")
    );

    rangeInput.forEach((input) => {
      input.addEventListener("input", (event) => {
        const target = <HTMLElement>event.target;
        this.updateInputRange(target, filter, isPrice);
      });
    });
  }

  run(): void {
    this.model.getFilterSection();
    this.setCheckboxListener();
    this.handleRangeChange(true)
    this.handleRangeChange(false)
    this.resetFilters();
  }
}
