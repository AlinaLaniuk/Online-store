import { view } from "../../utils/constants";
import { DisplayBardModel } from "./displayBarModel";
import { DisplayBarView } from "./displayBarView";

export class DisplayBarController {
  view: DisplayBarView;
  model: DisplayBardModel;

  constructor() {
    this.view = new DisplayBarView();
    this.model = new DisplayBardModel(
      this.view.generateSection.bind(this.view),
      this.view.handleViewBig.bind(this.view),
      this.view.handleViewSmall.bind(this.view),
      this.view.updateFoundItemsNum.bind(this.view)
    );
  }

  setViewBar() {
    this.view.cardsViewButtons!.forEach((item): void => {
      item.addEventListener("click", (event: Event): void => {
        this.model.handleCardViewChange(event);
      });
    });
  }

  setSearchBar() {
    this.view.searchBar!.addEventListener("input", () => {
      view.search = this.view.searchBar!.value;
      this.view.searchBar!.setAttribute("value", this.view.searchBar!.value);
    });
  }

  // debounce = (fn: Function, ms: number) => {
  //   let timeout: ReturnType<typeof setTimeout>;

  //   return  function() {
  //     const fnCall = () => {
  //       fn.apply(this, arguments);
  //     };
  //     clearTimeout(timeout);
  //     timeout = setTimeout(fnCall, ms);
  //   };
  // };

  debounce = (fn: Function, ms: number) => {
    let timeout: ReturnType<typeof setTimeout>;
  
    return  () => {
      const fnCall = () => {
        fn.apply(this, DisplayBarController.arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  
  consoleSomething() {
    console.log('Hi');
  }
  
  update() {
    this.model.updateItemsNum();
    this.debounce(this.consoleSomething, 1000)
  }

  run(): void {
    this.model.getDisplayBar();
    this.setViewBar();
    this.setSearchBar();
  }
}
