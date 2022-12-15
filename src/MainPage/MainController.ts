import { CardsFieldController } from "./componentsMainPage/cardsField/CardsFieldController";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";

export class MainController {
  view: MainView;
  model: MainModel;

  constructor() {
    this.view = new MainView();
    this.model = new MainModel(this.view.getTemplate);
  }

  public drawMain() {
    this.model.getMain();

    const cardField = new CardsFieldController();
    cardField.drawCardField();
  }
}
