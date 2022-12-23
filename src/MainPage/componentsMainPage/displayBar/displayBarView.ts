import { IDataItem } from "../../utils/interface";

export class DisplayBarView {
  mainWrapper: HTMLElement;
  cardsViewButtons: NodeListOf<Element> | null;

  constructor() {
    this.mainWrapper = <HTMLElement>document.querySelector(".main-wrapper");
    this.cardsViewButtons = null;
  }

  generateDisplayTemplate(items: number): void {
    const displayBar = document.createElement("section");
    displayBar.className = "display-bar";

    const sortBar = document.createElement("select");
    sortBar.className = "display-bar__sort-bar";

    const itemsNum = document.createElement("p");
    itemsNum.className = "display-bar__items-num";
    itemsNum.textContent = `Found: ${items}`;

    const searchBar = document.createElement("input");
    searchBar.className = "display-bar__search-bar";
    searchBar.setAttribute("type", "search");
    searchBar.setAttribute("placeholder", "Search product");

    const viewButtons = document.createElement("div");
    viewButtons.className = "display-bar__button-list";

    const bigLabel = document.createElement("label");
    bigLabel.className = "display-bar__view-label";
    bigLabel.setAttribute("for", "view-big");
    bigLabel.textContent = "Big";

    const bigView = document.createElement("input");
    bigView.className = "display-bar__view-button";
    bigView.setAttribute("name", "cards-view");
    bigView.setAttribute("id", "view-big");
    bigView.setAttribute("type", "radio");

    const smallLabel = document.createElement("label");
    smallLabel.className = "display-bar__view-label";
    smallLabel.setAttribute("for", "view-big");
    smallLabel.textContent = "Small";

    const smallView = document.createElement("input");
    smallView.className = "display-bar__view-button";
    smallView.setAttribute("name", "cards-view");
    smallView.setAttribute("id", "view-small");
    smallView.setAttribute("type", "radio");

    bigLabel.append(bigView);
    smallLabel.append(smallView);
    viewButtons.append(bigLabel, smallLabel);
    displayBar.append(sortBar, itemsNum, searchBar, viewButtons);
    this.mainWrapper.append(displayBar);
  }

  generateSortOptions(optionList: string[]): void {
    const sortBar = <HTMLElement>(
      this.mainWrapper.querySelector(".display-bar__sort-bar")
    );

    optionList.forEach((item): void => {
      const sortOption = <HTMLOptionElement>document.createElement("option");
      sortOption.className = "sort-option";

      if (optionList.indexOf(item) === 0) {
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

  setViewInitial() {
    this.cardsViewButtons = <NodeListOf<Element>>(
      this.mainWrapper.querySelectorAll(".display-bar__view-button")
    );
    this.cardsViewButtons[0].setAttribute("disabled", "");
    this.cardsViewButtons[0].setAttribute("checked", "");
  }

  generateSection(items: number, optionList: string[]): void {
    this.generateDisplayTemplate(items);
    this.generateSortOptions(optionList);

    this.setViewInitial();
  }

  handleViewSmall(list: HTMLElement): void {
    list.classList.add("card-list_type_small");
    this.cardsViewButtons![0].removeAttribute("disabled");
    this.cardsViewButtons![0].removeAttribute("checked");
  }

  handleViewBig(list: HTMLElement) {
    list.classList.remove("card-list_type_small");
    this.cardsViewButtons![1].removeAttribute("disabled");
    this.cardsViewButtons![1].removeAttribute("checked");
  }
}
