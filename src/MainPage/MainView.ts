export class MainView {
  public getTemplate() {
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';

    const main = <HTMLElement>document.querySelector('.page')
    main.append(mainContent);
  }
}
