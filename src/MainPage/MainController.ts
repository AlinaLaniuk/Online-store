import { CardMainController } from "./componentsMainPage/cardMain/CardMainController";
import { FiltersController } from "./componentsMainPage/filters/FiltersController";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";

export class MainController {
  view: MainView;
  model: MainModel;
  cardMainController: CardMainController;
  filterController: FiltersController;
  
  constructor() {
    this.view = new MainView();
    this.model = new MainModel(this.view.getTemplate);
    this.cardMainController = new CardMainController();
    this.filterController = new FiltersController();
  }

  public run(): void {
    this.model.getMain();

    this.cardMainController.run();
    this.filterController.run();
  }
}
