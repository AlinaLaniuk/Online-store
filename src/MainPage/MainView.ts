export class MainView {
  public getTemplate(): void {
    const mainWrapper = <HTMLElement>document.querySelector(".main-wrapper");

    mainWrapper.innerHTML = "";
  }
}
