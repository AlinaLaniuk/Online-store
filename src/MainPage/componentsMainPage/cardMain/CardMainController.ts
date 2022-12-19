import { CardMainModel } from './CardMainModel';
import {CardMainView} from './CardMainView';

export class CardMainController {
  view: CardMainView;
  model: CardMainModel;

  constructor() {
    this.view = new CardMainView();
    this.model = new CardMainModel(this.view.getCardTemplate, this.view.getCardListTemplate);
  }

  public drawCardList() {
    this.model.getCardList();
  }
}