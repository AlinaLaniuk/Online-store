import { IDataItem } from "../../utils/interface";

export class CardMainView {
  mainWrapper: HTMLElement;

  constructor() {
    this.mainWrapper = <HTMLElement>document.querySelector(".main-wrapper");
  }

  public getCardListTemplate() {
    const cardsSection = document.createElement("section");
    cardsSection.className = "card-section";

    const cardList = document.createElement("ul");
    cardList.className = "card-list";

    cardsSection.append(cardList);
    this.mainWrapper.append(cardsSection);
  }

  public refreshCardList(): void {
    const cardList = <HTMLElement>document.querySelector(".card-list");
    cardList.innerHTML = "";
  }

  public getCardTemplate(
    data: IDataItem,
    currencySymbol: string,
    isInCart: boolean
  ): void {
    const cardList = <HTMLElement>document.querySelector(".card-list");

    const card = document.createElement("li");
    card.className = "card";
    card.setAttribute("data-product-id", data.id.toString());

    const cardImage = document.createElement("img");
    cardImage.className = "card__image";
    cardImage.src = data.thumbnail;

    const cardContent = document.createElement("div");
    cardContent.className = "card__content";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card__title";
    cardTitle.textContent = data.title;

    const cardDesc = document.createElement("div");
    cardDesc.className = "card__desc";

    const cardCategory = document.createElement("p");
    cardCategory.className = "card__category";
    cardCategory.textContent = `Category: ${data.category}`;

    const cardBrand = document.createElement("p");
    cardBrand.className = "card__brand";
    cardBrand.textContent = `Brand: ${data.brand}`;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card__price";
    cardPrice.textContent = `Price: ${currencySymbol}${data.price.toFixed(2)}`;

    const cardDiscount = document.createElement("p");
    cardDiscount.className = "card__discount";
    cardDiscount.textContent = `Discount: ${data.discountPercentage.toFixed(
      2
    )}`;

    const cardRating = document.createElement("p");
    cardRating.className = "card__rating";
    cardRating.textContent = `Rating: ${data.rating.toFixed(2)}%`;

    const cardStock = document.createElement("p");
    cardStock.className = "card__stock";
    cardStock.textContent = `Stock: ${data.stock}`;

    const cardButtons = document.createElement("div");
    cardButtons.className = "card__buttons";

    const addBtn = document.createElement("button");
    addBtn.className = "card__add-button";

    this.handleAddBtnState(addBtn, isInCart);

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "card__details-button";
    detailsBtn.textContent = "Details";

    cardButtons.append(addBtn, detailsBtn);
    card.append(cardImage, cardContent, cardButtons);
    cardContent.append(cardTitle, cardDesc);
    cardDesc.append(
      cardCategory,
      cardBrand,
      cardPrice,
      cardDiscount,
      cardRating,
      cardStock
    );

    cardList.append(card);
  }

  handleAddBtnState(button: HTMLElement, isInCart: boolean): void {
    if (isInCart) {
      button.textContent = "Drop from card";
      button.classList.add("card__add-button__active");
    } else {
      button.textContent = "Add to card";
      button.classList.remove("card__add-button__active");
    }
  }

  updateCardsView(view: boolean): void {
    const cardList = <HTMLElement>document.querySelector(".card-list");

    if (view === true) {
      cardList.classList.remove("card-list_type_small");
    } else {
      cardList.classList.add("card-list_type_small");
    }
  }
}
