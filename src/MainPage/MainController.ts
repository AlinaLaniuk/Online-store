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
    const mainContent = this.model.getMain();;

    const cardField = new CardsFieldController();

    mainContent.append(cardField.drawCardField());

    return mainContent;
  }
}
