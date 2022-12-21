import onlineStoreData from "../../../data/data";
import { IDataItem } from "../../utils/interface";

export class FiltersModel {
  getCategoryList: Function;
  generateFilterSection: Function;
  generateItems: Function;
  data: IDataItem[];

  constructor(
    getCategoryList: Function,
    generateFilterSection: Function,
    generateItems: Function
  ) {

    this.getCategoryList = getCategoryList;
    this.generateFilterSection = generateFilterSection;
    this.generateItems = generateItems;
    this.data = onlineStoreData;
  }

  public getFilterSection(): void {
    this.getCategoryList(this.data);
    this.generateFilterSection(this.data);
    this.generateItems(this.data);
  }
}
