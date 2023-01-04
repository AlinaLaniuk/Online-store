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
    option: "category",
    type: "checkbox",
  },
  {
    option: "brand",
    type: "checkbox",
  },
  {
    option: "price",
    type: "range",
    min: 0,
    max: 0,
  },
  {
    option: "stock",
    type: "range",
    min: 0,
    max: 0,
  },
];

export const sortOptionsList = [
  "Sort options:",
  "price ASC",
  "price DESC",
  "rating ASC",
  "rating DESC",
  "discount ASC",
  "discount DESC",
];

export const view = {
  filter: {
    category: [] as string[],
    brand: [] as string[],
    price: {
      min: 0,
      max: 0,
    },
    stock: {
      min: 0,
      max: 0,
    },
  },
  sort: {
    key: "id",
    direction: "asc",
  },
  itemsFound: 0,
  search: "",
  isBig: true,
  default: true,
};

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
