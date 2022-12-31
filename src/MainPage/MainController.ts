import { CardMainController } from "./componentsMainPage/cardMain/CardMainController";
import { DisplayBarController } from "./componentsMainPage/displayBar/displayBarController";
import { FiltersController } from "./componentsMainPage/filters/FiltersController";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";

export class MainController {
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

  private update(): void {
    this.cardMainController.update();
    this.displayBarController.update();
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
