import { CardMainController } from "./componentsMainPage/cardMain/CardMainController";
import { DisplayBarController } from "./componentsMainPage/displayBar/displayBarController";
import { FiltersController } from "./componentsMainPage/filters/FiltersController";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";
import { view } from "./utils/constants";

class MainController {
  view: MainView;
  model: MainModel;
  cardMainController: CardMainController;
  filterController: FiltersController;
  displayBarController: DisplayBarController;
  displayBarObserver: MutationObserver;
  filterSectionObserver: MutationObserver;

  constructor() {
    this.view = new MainView();
    this.model = new MainModel(this.view.getTemplate);
    this.cardMainController = new CardMainController();
    this.filterController = new FiltersController();
    this.displayBarController = new DisplayBarController();
    this.displayBarObserver = new MutationObserver(() => {
      this.update();
    });
    this.filterSectionObserver = new MutationObserver(() => {
      this.update();
    });
  }

  generateQueryString() {
    let qyeryString = "";

    const priceFilter = <HTMLElement>(
      document.querySelector(".filter-range-price")
    );
    const stockFilter = <HTMLElement>(
      document.querySelector(".filter-range-stock")
    );
    const rangePrice = <HTMLInputElement>(
      priceFilter.querySelector(".range-min")
    );
    const rangeStock = <HTMLInputElement>(
      stockFilter.querySelector(".range-min")
    );

    const arr = [
      view.search,
      view.sort,
      view.isBig,
      view.filter.category.length,
      view.filter.brand.length,
      view.filter.price.min !== parseInt(rangePrice.min),
      view.filter.price.max !== parseInt(rangePrice.max),
      view.filter.stock.min !== parseInt(rangeStock.min),
      view.filter.stock.max !== parseInt(rangeStock.max),
    ];
    arr.filter((item) => item).length && (qyeryString += "?");

    if (view.filter.category.length) {
      qyeryString += "category=";
      view.filter.category.forEach((item) => {
        qyeryString += `${item}↕`;
      });
      qyeryString = qyeryString.slice(0, -1);
    }

    if (view.filter.brand.length) {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "brand=";
      view.filter.brand.forEach((item) => {
        qyeryString += `${item}↕`;
      });
      qyeryString = qyeryString.slice(0, -1);
    }

    if (
      view.filter.price.min !== parseInt(rangePrice.min) ||
      view.filter.price.max !== parseInt(rangePrice.max)
    ) {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "price=";
      qyeryString += `${view.filter.price.min}↕${view.filter.price.max}`;
    }

    if (
      view.filter.stock.min !== parseInt(rangeStock.min) ||
      view.filter.stock.max !== parseInt(rangeStock.max)
    ) {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "stock=";
      qyeryString += `${view.filter.stock.min}↕${view.filter.stock.max}`;
    }

    if (view.sort.key !== "id") {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "sort=";
      qyeryString += `${view.sort.key}-${view.sort.direction.toUpperCase()}`;
    }

    if (view.search) {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "search=";
      qyeryString += `${view.search}`;
    }

    if (!view.default) {
      qyeryString !== "?" && (qyeryString += "&");
      qyeryString += "big=";
      qyeryString += view.isBig ? "true" : "false";
    }

    qyeryString === "?" && (qyeryString = "");
    history.pushState(null, "", "/" + qyeryString);
  }

  private update(): void {
    this.cardMainController.update();
    this.displayBarController.update();

    this.generateQueryString();
  }

  public run(): void {
    this.model.getMain();

    this.filterController.run();
    this.displayBarController.run();
    this.cardMainController.run();

    const displayBar = <Node>document.querySelector(".display-bar");
    this.displayBarObserver.observe(displayBar, {
      childList: true,
      subtree: true,
      characterDataOldValue: true,
      attributes: true,
    });

    const filterSection = <Node>document.querySelector(".filter-section");
    this.filterSectionObserver.observe(filterSection, {
      childList: true,
      subtree: true,
      characterDataOldValue: true,
      attributes: true,
    });
  }
}

export default MainController;
