import { FiltersModel } from "./FiltersModel";
import { FiltersView } from "./FiltersView";

export class FiltersController {
  view: FiltersView;
  model: FiltersModel;

  constructor() {
    this.view = new FiltersView();
    this.model = new FiltersModel(
      this.view.getFilterList,
      this.view.getCategoryList,
      this.view.generateFilterSection,
      this.view.generateItems
    );
  }

  public drawFilterList() {
    this.model.getFilterSection();
  }
}
