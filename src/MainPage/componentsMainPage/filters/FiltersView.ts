import {
  filterCheckboxItem,
  filterOption,
  IDataItem,
  IRange,
  IrangeData,
} from "../../utils/interface";
import { currencySymbol, rangeSymbol } from "../../utils/constants";

export class FiltersView {
  mainWrapper: HTMLElement;

  constructor() {
    this.mainWrapper = <HTMLElement>document.querySelector(".main-wrapper");
  }

  // filter list
  getFilterSection(): void {
    const filterSection = document.createElement("aside");
    filterSection.className = "filter-section";

    const filterButtons = document.createElement("div");
    filterButtons.className = "filter-section__buttons";

    const resetFiltersBtn = document.createElement("button");
    resetFiltersBtn.setAttribute("type", "button");
    resetFiltersBtn.className = "filter-section__reset";
    resetFiltersBtn.textContent = "Reset Filters";

    const copyLinkBtn = document.createElement("button");
    copyLinkBtn.setAttribute("type", "button");
    copyLinkBtn.className = "filter-section__copy";
    copyLinkBtn.textContent = "Copy Link";

    filterButtons.append(resetFiltersBtn, copyLinkBtn);
    filterSection.append(filterButtons);

    this.mainWrapper.append(filterSection);
  }
  // checkbox template
  generateCheckboxItem(container: HTMLElement, data: filterCheckboxItem): void {
    const item = document.createElement("li");
    item.className = "checkbox-item";

    const input = document.createElement("input");
    input.className = "checkbox-item__unput";
    input.name = "category-item";
    input.type = "checkbox";

    const label = document.createElement("label");
    label.className = "checkbox-item__label";
    label.setAttribute("for", "category-item");

    const span = document.createElement("span");
    label.className = "checkbox-item__span";

    label.textContent = data.title;

    span.textContent = `(${data.items}/${data.items})`;
    label.append(span);
    input.setAttribute("id", data.title);

    item.append(input, label);
    label.append(span);
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
    filterList.setAttribute(
      "id",
      `${el.option.toLocaleLowerCase()}-${el.type}`
    );

    const filterSectionList = <HTMLElement>(
      this.mainWrapper.querySelector(".filter-section__list")
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
    rangeFilter.className = "filter-item filter-item_type_range";

    const title = document.createElement("h3");
    title.className = "filter-item__title";
    title.textContent = el.option;

    const desc = document.createElement("div");
    desc.className = "filter-range__desc";

    const span = document.createElement("span");
    span.className = "filter-item__symbol";
    span.textContent = rangeSymbol;

    const min = document.createElement("p");
    min.className = "filter-item__min";

    const max = document.createElement("p");
    max.className = "filter-item__max";

    const input = document.createElement("input");
    input.className = "filter-item__range";
    input.type = "range";

    if (el.option === "Price") {
      const range = data.price;

      min.textContent = currencySymbol + range.min.toString();
      max.textContent = currencySymbol + range.max.toString();
    } else if (el.option === "Stock") {
      const range = data.stock;

      min.textContent = range.min.toString();
      max.textContent = range.max.toString();
    }

    const filterSectionList = <HTMLElement>(
      this.mainWrapper.querySelector(".filter-section__list")
    );

    desc.append(min, span, max);
    rangeFilter.append(title, desc, input);

    if (filterSectionList) {
      filterSectionList.append(rangeFilter);
    }
  }

  // content
  generateFilterSection(data: IrangeData, options: filterOption[]): void {
    this.getFilterSection();

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
