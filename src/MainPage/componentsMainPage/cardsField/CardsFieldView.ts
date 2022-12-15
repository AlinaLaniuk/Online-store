export class CardsFieldView {
  public getTemplate() {
    const cardField = document.createElement('ul');
    cardField.className = 'card-list';

    const mainContent = <HTMLElement>document.querySelector('.main-content');
    mainContent.append(cardField);
  }
}