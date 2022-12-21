export class MainModel {
  getTemplate: Function;

  constructor(getTemplate: Function) {
    this.getTemplate = getTemplate;
  }

  public getMain(): void {
    this.getTemplate();
  }
}
