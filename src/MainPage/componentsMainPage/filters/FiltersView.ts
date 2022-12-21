import {
  filterCheckboxItem,
  filterOption,
  IDataItem,
  IRange,
} from "../../utils/interface";
import { currencySymbol, filterOptionsList } from "../../utils/constants";
import { rangeSymbol } from "../../utils/constants";

export class FiltersView {
  categoryList: string[];
  brandList: string[];
  newCategoryList: filterCheckboxItem[];
  newBrandList: filterCheckboxItem[];
  main: HTMLElement;

  constructor() {
    this.categoryList = [];
    this.brandList = [];
    this.newCategoryList = [];
    this.newBrandList = [];
    this.main = <HTMLElement>document.querySelector(".main-wrapper");
  }

  // create category list & brand list
  getCategoryList(data: IDataItem[]): void {
    data.forEach((item: IDataItem): void => {
      const category: string = item.category;
      const brand: string = item.brand;

      if (this.categoryList && !this.categoryList.includes(category)) {
        this.categoryList.push(category);
      }
      if (this.brandList && !this.brandList.includes(brand)) {
        this.brandList.push(brand);
      }
    });
  }
  // get items number for each category
  getNewCategoryList(data: IDataItem[]): void {
    this.categoryList.sort((a: string, b: string) => (a > b ? 1 : -1));

    this.newCategoryList = this.categoryList.map(
      (el): filterCheckboxItem => {
        return {
          title: el,
          items: data.filter((item) => item.category === el).length,
        };
      }
    );
  }
  // get items number for each brand
  getNewBrandList(data: IDataItem[]): void {
    this.brandList.sort((a: string, b: string) => (a > b ? 1 : -1));

    this.newBrandList = this.brandList.map(
      (el): filterCheckboxItem => {
        return {
          title: el,
          items: data.filter((item) => item.brand === el).length,
        };
      }
    );
  }

  generateItems(data: IDataItem[]): void {
    this.getNewCategoryList(data);
    this.getNewBrandList(data);

    this.newCategoryList.forEach((el): void => {
      const container = <HTMLElement>(
        document.querySelector("#category-checkbox")
      );
      this.generateCheckboxItem(container, el);
    });

    this.newBrandList.forEach((el): void => {
      const container = <HTMLElement>document.querySelector("#brand-checkbox");
      this.generateCheckboxItem(container, el);
    });
  }

  // filter list
  public getFilterSection(): void {
    const filterSection = document.createElement("aside");
    filterSection.className = "filter-section";

    const mainContent = <HTMLElement>document.querySelector(".main-wrapper");
    mainContent.append(filterSection);
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
    filterList.className = ".filter-item__list";
    filterList.setAttribute(
      "id",
      `${el.option.toLocaleLowerCase()}-${el.type}`
    );

    const mainContent = <HTMLElement>document.querySelector(".main-wrapper");
    const filterSectionList = <HTMLElement>(
      mainContent.querySelector(".filter-section__list")
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

  generateRangeFilter(el: filterOption, data: IDataItem[]): void {
    const rangeFilter = document.createElement("li");
    rangeFilter.className = "filter-item filter-item_type_range";

    const title = document.createElement("h3");
    title.className = ".filter-item__title";
    title.textContent = el.option;

    const desc = document.createElement("div");
    desc.className = "filter-range__desc";

    const span = document.createElement("span");
    span.className = "filter-item__symbol";
    span.textContent = rangeSymbol;

    const min = document.createElement("p");
    min.className = ".filter-item__min";

    const max = document.createElement("p");
    max.className = ".filter-item__max";

    const input = document.createElement("input");
    input.className = "filter-item__range";
    input.type = "range";

    if (el.option === "Price") {
      const range = this.getPriceRange(data);

      min.textContent = currencySymbol + range.min.toString();
      max.textContent = currencySymbol + range.max.toString();
    } else if (el.option === "Stock") {
      const range = this.getStockRange(data);

      min.textContent = range.min.toString();
      max.textContent = range.max.toString();
    }

    const mainContent = <HTMLElement>document.querySelector(".main-wrapper");
    const filterSectionList = <HTMLElement>(
      mainContent.querySelector(".filter-section__list")
    );

    desc.append(min, span, max);
    rangeFilter.append(title, desc, input);

    if (filterSectionList) {
      filterSectionList.append(rangeFilter);
    }
  }

  // content
  generateFilterSection(data: IDataItem[]): void {
    this.getFilterSection();

    const filterSectionList = document.createElement("ul");
    filterSectionList.className = "filter-section__list";
    const filterSection = <HTMLElement>(
      document.querySelector(".filter-section")
    );
    filterSection.append(filterSectionList);

    filterOptionsList.forEach((item): void => {
      if (item.type === "checkbox") {
        this.generateCheckboxFilter(item);
      } else if (item.type === "range") {
        this.generateRangeFilter(item, data);
      }
    });
  }
}
