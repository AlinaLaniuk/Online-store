import {
  filterCheckboxItem,
  filterOption,
  IDataItem,
  IRange,
  IrangeData,
} from "../../utils/interface";
import { currencySymbol, rangeSymbol, view } from "../../utils/constants";

export class FiltersView {
  mainWrapper: HTMLElement | null;
  copyLinkBtn: HTMLButtonElement | null;

  constructor() {
    this.mainWrapper = null;
    this.copyLinkBtn = null;
  }

  // filter list
  generateSectionTemplate(): void {
    this.mainWrapper = <HTMLElement>document.querySelector(".main-container");

    const filterSection = document.createElement("aside");
    filterSection.className = "filter-section";

    const filterButtons = document.createElement("div");
    filterButtons.className = "filter-section__buttons";

    const resetBtn = document.createElement("button");
    resetBtn.setAttribute("type", "button");
    resetBtn.className = "filter-section__button filter-section__reset";
    resetBtn.textContent = "Reset Filters";

    const copyBtn = document.createElement("button");
    copyBtn.setAttribute("type", "button");
    copyBtn.className = "filter-section__button filter-section__copy";
    copyBtn.textContent = "Copy Link";
    this.copyLinkBtn = copyBtn;

    filterButtons.append(resetBtn, copyBtn);
    filterSection.append(filterButtons);

    this.mainWrapper.append(filterSection);
  }
  
  // checkbox template
  generateCheckboxItem(container: HTMLElement, data: filterCheckboxItem): void {
    const containerId = <string>container.getAttribute("id");
    const item = document.createElement("li");
    item.className = "checkbox-item";

    const input = document.createElement("input");
    input.className = "checkbox-item__input";
    input.name = `${container.getAttribute("id")}-item`;
    input.type = "checkbox";
    input.setAttribute("id", data.title);

    const label = document.createElement("label");
    label.className = "checkbox-item__label";
    label.setAttribute("for", data.title);
    label.textContent = data.title;

    const spanBox = document.createElement("div");
    spanBox.className = "checkbox-item__span-box";

    const query = containerId === 'category' ? 'category' : 'brand';
    const filterItemsFound = view.filterList[query][data.title] !== undefined ? view.filterList[query][data.title] : data.items;

    const spanFound = document.createElement("span");
    spanFound.className = "checkbox-item__span";
    spanFound.textContent = `(${filterItemsFound}/`;

    const spanTotal = document.createElement("span");
    spanTotal.className = "checkbox-item__span";
    spanTotal.textContent = `${data.items})`;

    spanBox.append(spanFound, spanTotal)

    label.prepend(input);
    item.append(label, spanBox);
    container.append(item);
  }
  // get checkbox filter
  generateCheckboxFilter(el: filterOption): void {
    const checkboxFilter = document.createElement("li");
    checkboxFilter.className = "filter-item filter-item_type_checkbox";

    const title = document.createElement("h3");
    title.className = "filter-item__title";
    title.textContent = el.option;

    const filterList = document.createElement("ul");
    filterList.className = "filter-item__list";
    filterList.setAttribute("id", `${el.option.toLowerCase()}-${el.type}`);

    const filterSectionList = <HTMLElement>(
      this.mainWrapper!.querySelector(".filter-section__list")
    );

    checkboxFilter.append(title, filterList);
    if (filterSectionList) {
      filterSectionList.append(checkboxFilter);
    }
  }

  // range
  getPriceRange(data: IDataItem[]): IRange {
    data.sort((a: IDataItem, b: IDataItem) => a.price - b.price);

    const min = data[0].price;
    const max = data[data.length - 1].price;

    return { min: min, max: max };
  }

  getStockRange(data: IDataItem[]): IRange {
    data.sort((a: IDataItem, b: IDataItem) => a.stock - b.stock);

    const min = data[0].stock;
    const max = data[data.length - 1].stock;

    return { min: min, max: max };
  }

  generateRangeFilter(el: filterOption, data: IrangeData): void {
    const rangeFilter = document.createElement("li");
    rangeFilter.className = `filter-item filter-item_type_range filter-range-${el.option}`;

    const title = document.createElement("h3");
    title.className = "filter-item__title";
    title.textContent = el.option;

    const desc = document.createElement("div");
    desc.className = "filter-range__desc";

    const span = document.createElement("span");
    span.className = "filter-range__symbol";
    span.textContent = rangeSymbol;

    const rangeMinText = document.createElement("p");
    rangeMinText.className = "filter-range__min";

    const rangeMaxText = document.createElement("p");
    rangeMaxText.className = "filter-range__max";

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";
    inputWrapper.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="slider">
        <div class="progress"></div>
      </div>
      <div class="range-input">
        <input type="range" class="range-min" step="1">
        <input type="range" class="range-max" step="1">
      </div>
  `
    );

    if (el.option === "price") {
      const range = data.price;
      const isPrice = true;
      this.setInputAttrubutes(
        isPrice,
        range,
        rangeMinText,
        rangeMaxText,
        inputWrapper
      );
    } else if (el.option === "stock") {
      const range = data.stock;
      const isPrice = false;
      this.setInputAttrubutes(
        isPrice,
        range,
        rangeMinText,
        rangeMaxText,
        inputWrapper
      );
    }

    const filterSectionList = <HTMLElement>(
      this.mainWrapper!.querySelector(".filter-section__list")
    );

    desc.append(rangeMinText, span, rangeMaxText);
    rangeFilter.append(title, desc, inputWrapper);

    if (filterSectionList) {
      filterSectionList.append(rangeFilter);
    }
  }

  setInputAttrubutes(
    isPrice: boolean,
    range: IRange,
    minText: HTMLElement,
    maxText: HTMLElement,
    inputWrapper: HTMLElement
  ) {
    minText.textContent =
      (isPrice ? currencySymbol : "") + range.min.toString();
    maxText.textContent =
      (isPrice ? currencySymbol : "") + range.max.toString();

    const rangeMin = <HTMLInputElement>inputWrapper.querySelector(".range-min");
    rangeMin.min = range.min.toString();
    rangeMin.max = range.max.toString();
    rangeMin.value = rangeMin.min;

    const rangeMax = <HTMLInputElement>inputWrapper.querySelector(".range-max");
    rangeMax.min = range.min.toString();
    rangeMax.max = range.max.toString();
    rangeMax.value = rangeMax.max;
  }

  // content
  generateFilterSection(data: IrangeData, options: filterOption[]): void {
    this.generateSectionTemplate();

    const filterSectionList = document.createElement("ul");
    filterSectionList.className = "filter-section__list";
    const filterSection = <HTMLElement>(
      document.querySelector(".filter-section")
    );
    filterSection.append(filterSectionList);

    options.forEach((item: filterOption): void => {
      if (item.type === "checkbox") {
        this.generateCheckboxFilter(item);
      } else if (item.type === "range") {
        this.generateRangeFilter(item, data);
      }
    });
  }
}
