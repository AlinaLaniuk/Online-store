export class MainModel {
  getTemplate: Function;

  constructor(getTemplate: Function) {
    this.getTemplate = getTemplate;
  }

  public getMain() {
    this.getTemplate();
  }
}
