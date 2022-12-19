import onlineStoreData from "../../../data/data";
import { IDataItem } from "../../utils/interface";

export class FiltersModel {
  getFilterList: Function;
  getCategoryList: Function;
  generateFilterSection: Function;
  generateItems: Function;
  data: IDataItem[];

  constructor(
    getFilterList: Function,
    getCategoryList: Function,
    generateFilterSection: Function,
    generateItems: Function
  ) {
    this.getFilterList = getFilterList;
    this.getCategoryList = getCategoryList;
    this.generateFilterSection = generateFilterSection;
    this.generateItems = generateItems;
    this.data = onlineStoreData;
  }

  public getFilterSection() {
    this.getFilterList(this.data);
    this.getCategoryList(this.data);
    this.generateFilterSection(this.data);
    this.generateItems(this.data);
  }
}
