export class CardsFieldModel {
  getTemplate: Function;

  constructor(getTemplate: Function) {
    this.getTemplate = getTemplate;
  }

  public getCardField() {
    this.getTemplate();
  }
}
