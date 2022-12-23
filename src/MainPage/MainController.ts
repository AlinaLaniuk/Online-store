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
  
  constructor() {
    this.view = new MainView();
    this.model = new MainModel(this.view.getTemplate);
    this.cardMainController = new CardMainController();
    this.filterController = new FiltersController();
    this.displayBarController = new DisplayBarController();
  }

  public run(): void {
    this.model.getMain();

    this.filterController.run();
    this.displayBarController.run();
    this.cardMainController.run();
  }

  update(): void {
    this.cardMainController.update();
    this.displayBarController.update();
  }
}
