export class MainView {
  public getTemplate() {
    const mainContent = document.createElement("div");
    mainContent.className = "main-wrapper";

    const main = <HTMLElement>document.querySelector(".main");

    main.innerHTML = "";
    main.append(mainContent);
  }
}
