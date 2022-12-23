import onlineStoreData from "../../../data/data";
import { currencySymbol, view } from "../../utils/constants";
import { IDataItem } from "../../utils/interface";

export class CardMainModel {
  getCardTemplate: Function;
  getCardListTemplate: Function;
  updateCardsView: Function;
  refreshCardList: Function;
  data: { id: number; title: string; description: string; price: number; discountPercentage: number; rating: number; stock: number; brand: string; category: string; thumbnail: string; images: string[]; }[];

  constructor(
    getCardTemplate: Function,
    getCardListTemplate: Function,
    updateCardsView: Function,
    refreshCardList: Function
  ) {
    this.getCardTemplate = getCardTemplate;
    this.getCardListTemplate = getCardListTemplate;
    this.updateCardsView = updateCardsView;
    this.refreshCardList = refreshCardList;
    this.data = onlineStoreData;
  }

  public getCardList(): void {
    this.getCardListTemplate();

    onlineStoreData.forEach((item: IDataItem): void => {
      this.getCardTemplate(item, currencySymbol);
    });
  }

  private filterData() {
    this.data = onlineStoreData.filter((item) => {
      return item.title.toLocaleLowerCase().includes(view.search.toLocaleLowerCase());
    });
  }

  updateCardsList(): void {
    this.updateCardsView(view.isBig);

    this.filterData();
    this.refreshCardList();
    this.data.forEach((item: IDataItem): void => {
      this.getCardTemplate(item, currencySymbol);
    });
  }
}
