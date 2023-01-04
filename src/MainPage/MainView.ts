export class MainView {
  public getTemplate(): void {
    const mainWrapper = <HTMLElement>document.querySelector(".main-wrapper");
    mainWrapper.innerHTML = "";

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("main-container");
    mainWrapper.append(mainContainer);
  }
}
