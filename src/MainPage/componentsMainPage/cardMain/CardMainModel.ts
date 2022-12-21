import onlineStoreData from "../../../data/data";
import { currencySymbol } from "../../utils/constants";
import { IDataItem } from "../../utils/interface";

export class CardMainModel {
  getCardTemplate: Function;
  getCardListTemplate : Function;

  constructor(getCardTemplate: Function, getCardListTemplate: Function) {
    this.getCardTemplate = getCardTemplate;
    this.getCardListTemplate = getCardListTemplate;
  }

  public getCardList(): void {
    this.getCardListTemplate();

    onlineStoreData.forEach((item: IDataItem): void => {
      this.getCardTemplate(item, currencySymbol);
    });
  }
}
