import { FiltersModel } from "./FiltersModel";
import { FiltersView } from "./FiltersView";

export class FiltersController {
  view: FiltersView;
  model: FiltersModel;

  constructor() {
    this.view = new FiltersView();
    this.model = new FiltersModel(
      this.view.getCategoryList.bind(this.view),
      this.view.generateFilterSection.bind(this.view),
      this.view.generateItems.bind(this.view)
    );
  }

  public drawFilterList(): void {
    this.model.getFilterSection();
  }
}
