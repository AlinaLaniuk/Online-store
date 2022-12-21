import onlineStoreData from "../../../data/data";
// import { IDataItem } from "../../utils/interface";
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

  constructor(
    generateFilterSection: Function,
    generateCheckboxItem: Function,
  ) {
    this.categoryList = [];
    this.brandList = [];
    this.newCategoryList = [];
    this.newBrandList = [];
    this.generateFilterSection = generateFilterSection;
    this.generateCheckboxItem = generateCheckboxItem;

    this.data = onlineStoreData;
  }

  private getNewCategoryList(data: IDataItem[]): void {
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
  private getNewBrandList(data: IDataItem[]): void {
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

  public generateItems(data: IDataItem[]): void {
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
   public getCategoryList(data: IDataItem[]): void {
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

  public getFilterSection(): void {
    this.getCategoryList(this.data);
    this.generateFilterSection(this.data);
    this.generateItems(this.data);
  }
}
