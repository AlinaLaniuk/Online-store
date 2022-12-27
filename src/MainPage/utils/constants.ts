export const checkboxTemplate = "filter-checkbox-template";
export const checkboxContent = "filter-item";

export const rangeTemplate = "filter-range-template";
export const rangeContent = "filter-item";

export const checkboxItemTemplate = "checkbox-item-template";
export const checkboxItemContent = "checkbox-item";

export const filterSectionTemplate = "filter-section-template";
export const filterSectionContent = "filter-section";

export const cardItemTemplate = "card-item-template";
export const cardItemContent = "card-item";

export const displayBarTemplate = "display-bar-template";
export const displayBarContent = "display-bar";

export const cardsSectionTemplate = "cards-section-template";
export const cardsSectionContent = "cards-section";

export const currencySymbol: string = "€";
export const rangeSymbol: string = "⟷";

export const filterOptionsList = [
  {
    option: "Category",
    type: "checkbox",
  },
  {
    option: "Brand",
    type: "checkbox",
  },
  {
    option: "Price",
    type: "range",
    min: 10,
    max: 1800,
  },
  {
    option: "Stock",
    type: "range",
    min: 1,
    max: 100,
  },
];

export const sortOptionsList = [
  "Sort options:",
  "price ASC",
  "price DESC",
  "reting ASC",
  "reting DESC",
  "discount ASC",
  "discount DESC",
];

export const view = {
  itemsFound: 0,
  isBig: true,
  search: '',
}


class Debounce {
  run(fn: Function, ms: number) {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Event[]): void => {
      const fnCall = () => {
        fn.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  }
}

export const debounce = new Debounce();