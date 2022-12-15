export class CardsFieldModel {
  getTemplate: Function;

  constructor(getTemplate: Function) {
    this.getTemplate = getTemplate;
  }
  
  public getCardField() {
    return this.getTemplate();
  }
}