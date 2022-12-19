import { IDataItem } from "../../utils/interface";

export class CardMainView {
  public getCardListTemplate() {
    const cardList = document.createElement("div");
    cardList.className = "card-list";

    const mainContent = <HTMLElement>document.querySelector(".main-content");
    mainContent.append(cardList);
  }

  public getCardTemplate(data: IDataItem, currencySymbol: string): void {
    const card = document.createElement("li");
    card.className = "card";
    card.style.background = `url(${data.thumbnail})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundRepeat = "no-repeat";
    card.style.backgroundPosition = "top center";

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

    card.append(cardContent);
    cardContent.append(cardTitle, cardDesc);
    cardDesc.append(
      cardCategory,
      cardBrand,
      cardPrice,
      cardDiscount,
      cardRating,
      cardStock
    );

    const cardList = <HTMLElement>document.querySelector(".card-list");
    cardList.append(card);
  }
}
