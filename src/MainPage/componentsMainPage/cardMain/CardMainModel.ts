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
    this.data = onlineStoreData.slice();
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
    this.data = onlineStoreData.slice().filter((item) => {
      const conditionList = [
        item.title
          .toLocaleLowerCase()
          .includes(view.search.toLocaleLowerCase()),
        item.category
          .toLocaleLowerCase()
          .includes(view.search.toLocaleLowerCase()),
        item.brand
          .toLocaleLowerCase()
          .includes(view.search.toLocaleLowerCase()),
        item.description
          .toLocaleLowerCase()
          .includes(view.search.toLocaleLowerCase()),
        item.price.toString().includes(view.search),
        item.discountPercentage.toString().includes(view.search),
        item.rating.toString().includes(view.search),
        item.stock.toString().includes(view.search),
      ];
      return conditionList.some((el) => {
        if (el) {
          return item;
        }
      });
    });

    if (view.filter.category.length) {
      this.data = this.data.filter((item) => {
        if (view.filter.category.includes(item.category)) {
          return item;
        }
      });
    }

    if (view.filter.brand.length) {
      this.data = this.data.filter((item) => {
        if (view.filter.brand.includes(item.brand)) {
          return item;
        }
      });
    }

    this.data = this.data.filter((item) => {
      if (
        view.filter.price.min <= item.price &&
        view.filter.price.max >= item.price
      ) {
        return item;
      }
    });

    this.data = this.data.filter((item) => {
      if (
        view.filter.stock.min <= item.stock &&
        view.filter.stock.max >= item.stock
      ) {
        return item;
      }
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
  }

  public updateCardsList(): void {
    this.updateCardsView(view.isBig);

    this.filterData();
    this.sortData(view.sort.key, view.sort.direction);
    this.refreshCardList();
    this.getCards();
  }
}
