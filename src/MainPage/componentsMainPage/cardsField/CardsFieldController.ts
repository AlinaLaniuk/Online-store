import onlineStoreData from "../../../data/data";
import { CardMainController } from "../cardMain/CardMainController";
import { CardsFieldModel } from "./CardsFieldModel";
import { CardsFieldView } from "./CardsFieldView";

export class CardsFieldController {
  view: CardsFieldView;
  model: CardsFieldModel;

  constructor() {
    this.view = new CardsFieldView();
    this.model = new CardsFieldModel(this.view.getTemplate);
  }

  public drawCardField(): Element {
    const cardField = this.model.getCardField();

    onlineStoreData.forEach((item): void => {
      const cardMain = new CardMainController(item);

      cardField.append(cardMain.drawCard());

    });
    return cardField;
  }
}
