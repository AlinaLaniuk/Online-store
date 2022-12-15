import { IDataItem } from '../../utils/interface';
import { CardMainModel } from './CardMainModel';
import {CardMainView} from './CardMainView';

export class CardMainController {
  view: CardMainView;
  model: CardMainModel;
  data: IDataItem;

  constructor(data: IDataItem) {
    this.view = new CardMainView();
    this.data = data;
    this.model = new CardMainModel(this.view.getTemplate, this.data);
  }

  public drawCard(): HTMLElement {
    return this.model.getCard();
  }
}