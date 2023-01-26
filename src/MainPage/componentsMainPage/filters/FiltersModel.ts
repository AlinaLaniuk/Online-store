import onlineStoreData from "../../../data/onlineStoreData";
import { filterOptionsList, view } from "../../utils/constants";
import { currencySymbol } from "../../utils/constants";
import {
  filterCheckboxItem,
  filterOption,
  IDataItem,
  IRange,
} from "../../utils/interface";

export class FiltersModel {
  generateFilterSection: Function;
  data: IDataItem[];
  categoryList: string[];
  brandList: string[];
  newCategoryList: filterCheckboxItem[];
  newBrandList: filterCheckboxItem[];
  generateCheckboxItem: Function;
  rangeData: object;
  options: filterOption[];

  constructor(generateFilterSection: Function, generateCheckboxItem: Function) {
    this.categoryList = [];
    this.brandList = [];
    this.newCategoryList = [];
    this.newBrandList = [];
    this.generateFilterSection = generateFilterSection;
    this.generateCheckboxItem = generateCheckboxItem;

    this.data = onlineStoreData.slice();
    this.options = filterOptionsList;
    this.rangeData = {
      price: this.getPriceRange(this.data),
      stock: this.getStockRange(this.data),
    };
  }

  addFilter(item: HTMLInputElement) {
    const categoryArr = view.filter.category;
    const brandArr = view.filter.brand;

    const checkboxName = item.getAttribute("name");
    const checkboxId = <string>item.getAttribute("id");

    if (item.checked) {
      item.setAttribute("checked", "checked");

      if (checkboxName?.includes("category")) {
        categoryArr.push(checkboxId);
      } else if (checkboxName?.includes("brand")) {
        brandArr.push(checkboxId);
      }
    } else {
      item.removeAttribute("checked");

      if (checkboxName?.includes("category")) {
        categoryArr.splice(categoryArr.indexOf(checkboxId), 1);
      } else if (checkboxName?.includes("brand")) {
        brandArr.splice(brandArr.indexOf(checkboxId), 1);
      }
    }
  }

  getNewCategoryList(data: IDataItem[]): void {
    this.categoryList.sort((a: string, b: string) => (a > b ? 1 : -1));

    this.newCategoryList = this.categoryList.map(
      (el): filterCheckboxItem => {
        return {
          title: el,
          items: data.filter((item) => item.category === el).length,
          itemsFiltered: data.filter((item) => item.category === el).length,
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
          itemsFiltered: data.filter((item) => item.brand === el).length,
        };
      }
    );
  }

  getItems(data: IDataItem[]): void {
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

  // range
  getPriceRange(data: IDataItem[]): IRange {
    data.sort((a: IDataItem, b: IDataItem) => a.price - b.price);

    const min = data[0].price;
    const max = data[data.length - 1].price;

    view.filter.price.min = min;
    view.filter.price.max = max;

    return { min: min, max: max };
  }

  getStockRange(data: IDataItem[]): IRange {
    data.sort((a: IDataItem, b: IDataItem) => a.stock - b.stock);

    const min = data[0].stock;
    const max = data[data.length - 1].stock;

    view.filter.stock.min = min;
    view.filter.stock.max = max;
    return { min: min, max: max };
  }

  updateInputRange(target: HTMLElement, filter: HTMLElement, isPrice: boolean) {
    const rangeInputMin = <HTMLInputElement>filter.querySelector(".range-min");
    const rangeInputMax = <HTMLInputElement>filter.querySelector(".range-max");
    const range = <HTMLElement>filter.querySelector(".slider .progress");
    const inputType = isPrice ? "price" : "stock";
    let rangeGap = 10;

    const minText = <HTMLElement>filter.querySelector(".filter-range__min");
    const maxText = <HTMLElement>filter.querySelector(".filter-range__max");

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
      minText.textContent = `${isPrice ? currencySymbol : ""}${minVal}`;
      maxText.textContent = `${isPrice ? currencySymbol : ""}${maxVal}`;
      range.style.left = (minVal / parseInt(rangeInputMin.max)) * 100 + "%";
      range.style.right =
        100 - (maxVal / parseInt(rangeInputMax.max)) * 100 + "%";

      view.filter[inputType].min = minVal;
      view.filter[inputType].max = maxVal;
    }
  }

  resetFilters() {
    const checkboxList = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(".checkbox-item__input")
    );

    checkboxList.forEach((item) => {
      item.removeAttribute("checked");
      item.checked = false;
    });
    view.filter.category = [];
    view.filter.brand = [];
  }

  getPresetCheckbox(type: string) {
    const filterType = <string[]>view.filter[type as keyof typeof view.filter];

    if (filterType.length) {
      const checkboxList = <HTMLElement>(
        document.querySelector(`#${type}-checkbox`)
      );
      const filterArr = <NodeListOf<HTMLInputElement>>(
        checkboxList.querySelectorAll(".checkbox-item__input")
      );

      filterArr.forEach((item) => {
        const itemId = <string>item.getAttribute("id");
        if (filterType.includes(itemId)) {
          item.setAttribute("checked", "");
        }
      });
    }
  }

  getPresetRange(type: string) {
    const filterType = <IRange>view.filter[type as keyof typeof view.filter];
    const isPrice = type === "price";

    const rangeItem = <HTMLElement>(
      document.querySelector(`.filter-range-${type}`)
    );

    const minText = <HTMLElement>rangeItem.querySelector(".filter-range__min");
    minText.textContent = `${
      isPrice ? currencySymbol : ""
    }${filterType.min.toString()}`;

    const maxText = <HTMLElement>rangeItem.querySelector(".filter-range__max");
    maxText.textContent = `${
      isPrice ? currencySymbol : ""
    }${filterType.max.toString()}`;

    const minRange = <HTMLInputElement>rangeItem.querySelector(".range-min");
    minRange.value = filterType.min.toString();

    const maxRange = <HTMLInputElement>rangeItem.querySelector(".range-max");
    maxRange.value = filterType.max.toString();
  }

  getFilterSection(): void {
    this.generateFilterSection(this.rangeData, this.options);
    this.getCategoryList(this.data);
    this.getItems(this.data);
    this.getPresetCheckbox("category");
    this.getPresetCheckbox("brand");
    this.getPresetRange("price");
    this.getPresetRange("stock");
  }
}
