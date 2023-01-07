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

  updateViewFilterList() {
    const category = view.filterList.category;
    const brand = view.filterList.brand;
    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    let minStock: number | undefined;
    let maxStock: number | undefined;

    this.data.forEach((item) => {
      // set category items filtered
      if (category[item.category as keyof typeof category] === undefined) {
        category[item.category as keyof typeof category] = 1;
      } else {
        category[item.category as keyof typeof category] += 1;
      }
      // set brand items filtered
      if (brand[item.brand as keyof typeof brand] === undefined) {
        brand[item.brand as keyof typeof brand] = 1;
      } else {
        brand[item.brand as keyof typeof brand] += 1;
      }
      // set min price filtered
      if (minPrice === undefined) {
        minPrice = item.price;
      } else if (item.price < minPrice) {
        minPrice = item.price;
      }
      // set max price filtered
      if (maxPrice === undefined) {
        maxPrice = item.price;
      } else if (item.price > maxPrice) {
        maxPrice = item.price;
      }
      // set min stock filtered
      if (minStock === undefined) {
        minStock = item.stock;
      } else if (item.stock < minStock) {
        minStock = item.stock;
      }
      // set max stock filtered
      if (maxStock === undefined) {
        maxStock = item.stock;
      } else if (item.stock > maxStock) {
        maxStock = item.stock;
      }
    });
    view.filterList.price.min = minPrice;
    view.filterList.price.max = maxPrice;
    view.filterList.stock.min = minStock;
    view.filterList.stock.max = maxStock;
  }

  public getCardList(): void {
    this.getCardListTemplate();
    this.filterData();
    this.sortData(view.sort.key, view.sort.direction);
    this.getCards();
    view.itemsFound = this.data.length;
  }

  private getCards(): void {
    const cardList = <HTMLElement>document.querySelector(".card-list");

    if (this.data.length === 0) {
      cardList.classList.add("card-list_empty");
      cardList.textContent = `
      Sorry, we can't find any items that match your filters 😞
      \n\r
      Try changing your filters to find more items.
      `;
    } else {
      cardList.classList.remove("card-list_empty");
      this.data.forEach((item: IDataItem): void => {
        const isInCart = productsInCartInfo.quantity[item.id];
        this.getCardTemplate(item, currencySymbol, isInCart);
      });
    }
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

    view.filterList.category = {};
    view.filterList.brand = {};
    view.filterList.price = { min: 0, max: 0 };
    view.filterList.stock = { min: 0, max: 0 };

    this.updateViewFilterList();
    // console.table(view.filterList.category);
    // console.table(view.filterList.brand);
    // console.table(view.filterList.price);
    // console.table(view.filterList.stock);
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
    if (addBtn.classList.contains("card__add-button")) {
      const cardId = (<HTMLElement>addBtn.closest(".card")).getAttribute(
        "data-product-id"
      )!;
      const isInCart = productsInCartInfo.quantity[cardId];

      if (isInCart) {
        // productsInCartInfo.quantity[cardId] = 0;
        delete productsInCartInfo.quantity[cardId];
      } else {
        productsInCartInfo.quantity[cardId] = 1;
      }
      this.handleAddBtnState(addBtn, !isInCart);
    }
  }

  // public handleDetailsBtn(detailsBtn: HTMLElement): void {
  //   if (detailsBtn.classList.contains("card__details-button")) {
  //     const cardId = <string>(
  //       (<HTMLElement>detailsBtn.closest(".card")).getAttribute(
  //         "data-product-id"
  //       )
  //     );
  //     history.pushState(null, "", "/product-details-" + cardId);
  //   }
  // }

  public updateCardsList(): void {
    this.updateCardsView(view.isBig);

    this.filterData();
    this.sortData(view.sort.key, view.sort.direction);
    this.refreshCardList();
    this.getCards();
  }
}
