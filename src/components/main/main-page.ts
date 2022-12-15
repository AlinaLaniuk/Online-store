import onlineStoreData from "../../common/data";
import {
  checkboxTemplate,
  checkboxContent,
  currency,
  filterOptionsList,
  rangeTemplate,
  rangeContent,
  cardItemTemplate,
  cardItemContent,
  displayBarTemplate,
  displayBarContent,
  cardsSectionTemplate,
  cardsSectionContent,
} from "../../common/constants";
import { getTemplate } from "../../common/utils";
import {
  dataItem,
  filterCheckboxItem,
  filterOption,
} from "../interface";
import "../../styles/main.scss";
import {
  checkboxItemTemplate,
  checkboxItemContent,
} from "../../common/constants";
import {
  filterSectionContent,
  filterSectionTemplate,
  sortOptionsList,
} from "../../common/constants";

const main = <HTMLElement>document.querySelector(".main");

function generateCheckboxItem(el: filterCheckboxItem, container: HTMLElement) {
  const checkboxItem = getTemplate(checkboxItemTemplate, checkboxItemContent);
  const label = <HTMLElement>(
    checkboxItem.querySelector(".checkbox-item__label")
  );
  label.textContent = el.title;

  const span = <HTMLElement>document.createElement("span");
  span.className = "checkbox-item__span";
  span.textContent = `(${el.items}/${el.items})`;

  label.append(span);

  const input = <HTMLElement>(
    checkboxItem.querySelector(".checkbox-item__unput")
  );
  input.setAttribute("id", el.title);

  container.append(checkboxItem);
}

function generateCheckboxFilter(el: filterOption): void {
  const checkboxFilter = getTemplate(checkboxTemplate, checkboxContent);

  const title = <HTMLElement>(
    checkboxFilter.querySelector(".filter-item__title")
  );
  title.textContent = el.option;

  const filterList = <HTMLElement>(
    checkboxFilter.querySelector(".filter-item__list")
  );
  filterList.setAttribute("id", `${el.option.toLocaleLowerCase()}-${el.type}`);

  const filterSectionList = <HTMLElement>(
    main.querySelector(".filter-section__list")
  );
  filterSectionList.append(checkboxFilter);
}

function getPriceRange() {
  onlineStoreData.sort((a: dataItem, b: dataItem) => a.price - b.price);

  const min = onlineStoreData[0].price;
  const max = onlineStoreData[onlineStoreData.length - 1].price;

  return { min: min, max: max };
}

function getStockRange() {
  onlineStoreData.sort((a: dataItem, b: dataItem) => a.stock - b.stock);

  const min = onlineStoreData[0].stock;
  const max = onlineStoreData[onlineStoreData.length - 1].stock;

  return { min: min, max: max };
}

function generateRangeFilter(el: filterOption): void {
  const rangeFilter = getTemplate(rangeTemplate, rangeContent);

  const title = <HTMLElement>rangeFilter.querySelector(".filter-item__title");
  title.textContent = el.option;

  const min = <HTMLElement>rangeFilter.querySelector(".filter-item__min");
  const max = <HTMLElement>rangeFilter.querySelector(".filter-item__max");

  if (el.option === "Price") {
    const range = getPriceRange();

    min.textContent = currency + range.min.toString();
    max.textContent = currency + range.max.toString();
  } else if (el.option === "Stock") {
    const range = getStockRange();

    min.textContent = range.min.toString();
    max.textContent = range.max.toString();
  }

  const filterSectionList = <HTMLElement>(
    main.querySelector(".filter-section__list")
  );
  filterSectionList.append(rangeFilter);
}

// list of categories & brands
const categoryList: string[] = [];
const brandList: string[] = [];

onlineStoreData.forEach((item): void => {
  const category: string = item.category;
  const brand: string = item.brand;

  if (!categoryList.includes(category)) {
    categoryList.push(category);
  }
  if (!brandList.includes(brand)) {
    brandList.push(brand);
  }
});

categoryList.sort((a: string, b: string) => (a > b ? 1 : -1));
brandList.sort((a: string, b: string) => (a > b ? 1 : -1));

const newCategoryList: filterCheckboxItem[] = categoryList.map(
  (el): filterCheckboxItem => {
    return {
      title: el,
      items: onlineStoreData.filter((item) => item.category === el).length,
    };
  }
);

const newBrandList: filterCheckboxItem[] = brandList.map(
  (el): filterCheckboxItem => {
    return {
      title: el,
      items: onlineStoreData.filter((item) => item.brand === el).length,
    };
  }
);

// generate filter section
function generateFilterSectionContent(): void {
  filterOptionsList.forEach((item): void => {
    if (item.type === "checkbox") {
      generateCheckboxFilter(item);
    } else if (item.type === "range") {
      generateRangeFilter(item);
    }
  });
}

function generateItems(): void {
  newCategoryList.forEach((el): void => {
    const container = <HTMLElement>document.querySelector("#category-checkbox");
    generateCheckboxItem(el, container);
  });

  newBrandList.forEach((el): void => {
    const container = <HTMLElement>document.querySelector("#brand-checkbox");
    generateCheckboxItem(el, container);
  });
}

function generateFilterSection(container: HTMLElement): void {
  const filterSection = getTemplate(
    filterSectionTemplate,
    filterSectionContent
  );

  container.append(filterSection);
  generateFilterSectionContent();
  generateItems();
}

// generate cardList
function generateCardListContent(): void {
  onlineStoreData.forEach((item): void => {
    const card = <HTMLTemplateElement>(
      getTemplate(cardItemTemplate, cardItemContent)
    );
    card.style.background = `url(${item.thumbnail})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundRepeat = "no-repeat";
    card.style.backgroundPosition = "top center";

    const title = <HTMLElement>card.querySelector(".card-item__title");
    title.textContent = item.title;

    const category = <HTMLElement>card.querySelector(".card-item__category");
    category.textContent = `Category: ${item.category}`;

    const brand = <HTMLElement>card.querySelector(".card-item__brand");
    brand.textContent = `Brand: ${item.brand}`;

    const price = <HTMLElement>card.querySelector(".card-item__price");
    price.textContent = `Price: ${currency}${item.price.toFixed(2)}`;

    const discount = <HTMLElement>card.querySelector(".card-item__discount");
    discount.textContent = `Discount: ${item.discountPercentage.toFixed(2)}`;

    const rating = <HTMLElement>card.querySelector(".card-item__rating");
    rating.textContent = `Rating: ${item.rating.toFixed(2)}%`;

    const stock = <HTMLElement>card.querySelector(".card-item__stock");
    stock.textContent = `Stock: ${item.stock}`;

    main.querySelector(".card-list")!.append(card);
  });
}

function displayItemsNumber(): void {
  const itemsNum = <HTMLElement>main.querySelector(".display-bar__items-num");

  itemsNum.textContent = `Found: ${onlineStoreData.length}`;
}

function generateDisplayBar(container: HTMLElement): void {
  const displayBar = <HTMLTemplateElement>(
    getTemplate(displayBarTemplate, displayBarContent)
  );

  container.append(displayBar);
  generateSortOptions();
  displayItemsNumber();
  setViewBar();
}

function generateSortOptions() {
  const sortBar = <HTMLElement>main.querySelector(".sort-bar");

  sortOptionsList.forEach((item): void => {
    const sortOption = <HTMLOptionElement>document.createElement("option");
    sortOption.className = "sort-option";

    if (sortOptionsList.indexOf(item) === 0) {
      sortOption.disabled = true;
      sortOption.selected = true;
      sortOption.setAttribute("value", "sort-title");
      sortOption.textContent = item;
    } else {
      sortOption.setAttribute("value", item);
      sortOption.textContent = `Sort by ${item}`;
    }

    sortBar.append(sortOption);
  });
}

function generateCardList(container: HTMLElement): void {
  const cardList = <HTMLTemplateElement>(
    getTemplate(cardsSectionTemplate, cardsSectionContent)
  );

  container.append(cardList);
  generateCardListContent();
}

// cards view buttons
function handleViewSmall(list: HTMLElement, buttons: NodeListOf<Element>) {
  list.classList.add("card-list_type_small");
  buttons[1].removeAttribute("disabled");
  buttons[1].removeAttribute("checked");
}

function handleViewBig(list: HTMLElement, buttons: NodeListOf<Element>) {
  list.classList.remove("card-list_type_small");
  buttons[0].removeAttribute("disabled");
  buttons[0].removeAttribute("checked");
}

function handleCardViewChange(event: Event, buttons: NodeListOf<Element>) {
  const button = <HTMLButtonElement>event.target;
  let buttonId: string = "";

  const cardList = <HTMLElement>main.querySelector(".card-list");

  if (button) {
    buttonId = button.getAttribute("id")!;
  }

  if (buttonId === "view-small") {
    handleViewSmall(cardList, buttons);
  } else {
    handleViewBig(cardList, buttons);
  }

  button.disabled = true;
  button.setAttribute("checked", "");
}

function setViewBar() {
  const cardsViewButtons: NodeListOf<Element> = main.querySelectorAll(
    ".cards-view"
  );
  cardsViewButtons[1].setAttribute("disabled", "");
  cardsViewButtons[1].setAttribute("checked", "");

  cardsViewButtons.forEach((item): void => {
    item.addEventListener("click", (event: Event): void => {
      handleCardViewChange(event, cardsViewButtons);
    });
  });
}

export function generateMainPage() {
  const mainPage = <HTMLElement>document.createElement("div");
  mainPage.className = "main-page";

  main.append(mainPage);

  generateFilterSection(mainPage);
  generateDisplayBar(mainPage);
  generateCardList(mainPage);
};
