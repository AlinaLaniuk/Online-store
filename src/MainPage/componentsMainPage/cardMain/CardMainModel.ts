import { currency } from "../../utils/constants";
import { IDataItem } from "../../utils/interface";

export class CardMainModel {
  getTemplate: Function;
  cardData: IDataItem;

  constructor(getTemplate: Function, data: IDataItem) {
    this.getTemplate = getTemplate;
    this.cardData = data;
  }

  public getCard() {
    return this.getTemplate(this.cardData, currency);
  }
}
