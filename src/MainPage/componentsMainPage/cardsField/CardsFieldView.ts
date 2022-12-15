export class CardsFieldView {
  public getTemplate(): HTMLElement {
    const cardField = document.createElement('ul');
    cardField.className = 'card-list';

    return cardField;
  }
}