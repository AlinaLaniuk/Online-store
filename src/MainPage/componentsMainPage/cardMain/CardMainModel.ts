import onlineStoreData from "../../../data/data";
import { productsInCartInfo } from "../../../services/appServices";
import { currencySymbol, view } from "../../utils/constants";
import { IDataItem } from "../../utils/interface";

export class CardMainModel {
  getCardTemplate: Function;
  getCardListTemplate: Function;
  updateCardsView: Function;
  refreshCardList: Function;
  handleAddBtnState: Function;
  data: IDataItem[];

  constructor(
    getCardTemplate: Function,
    getCardListTemplate: Function,
    updateCardsView: Function,
    refreshCardList: Function,
    handleAddBtnState: Function
  ) {
    this.getCardTemplate = getCardTemplate;
    this.getCardListTemplate = getCardListTemplate;
    this.updateCardsView = updateCardsView;
    this.refreshCardList = refreshCardList;
    this.handleAddBtnState = handleAddBtnState;
    this.data = onlineStoreData;
  }

  public getCardList(): void {
    this.getCardListTemplate();
    this.filterData();
    this.sortData(view.sort.key, view.sort.direction);
    this.getCards();
    view.itemsFound = this.data.length;
  }

  private getCards(): void {
    this.data.forEach((item: IDataItem): void => {
      const isInCart = productsInCartInfo.quantity[item.id];
      this.getCardTemplate(item, currencySymbol, isInCart);
    });
  }

  filterData(): void {
    this.data = onlineStoreData.filter((item) => {
      return item.title
        .toLocaleLowerCase()
        .includes(view.search.toLocaleLowerCase());
    });

    view.itemsFound = this.data.length;
  }

  sortData(key: string, direction: string): void {
    if (view.sort.key && view.sort.direction) {
      this.data.sort((a, b): number => {
        if (direction.toLocaleLowerCase() === "asc") {
          return <number>a[key as keyof typeof a] >
            <number>b[key as keyof typeof b]
            ? 1
            : -1;
        } else {
          return <number>a[key as keyof typeof a] >
            <number>b[key as keyof typeof b]
            ? -1
            : 1;
        }
      });
    }
  }

  public handleAddBtn(addBtn: HTMLElement): void {
    const cardId = (<HTMLElement>addBtn.closest(".card")).getAttribute(
      "data-product-id"
    )!;
    const isInCart = productsInCartInfo.quantity[cardId];

    if (isInCart) {
      productsInCartInfo.quantity[cardId] = 0;
    } else {
      productsInCartInfo.quantity[cardId] = 1;
    }
    this.handleAddBtnState(addBtn, !isInCart);
    // console.log(`item ${cardId} is in the cart: ${!isInCart}`);
    // console.log(productsInCartInfo.quantity);
  }

  public updateCardsList(): void {
    this.updateCardsView(view.isBig);

    this.filterData();
    this.sortData(view.sort.key, view.sort.direction);
    this.refreshCardList();
    this.getCards();
  }
}
