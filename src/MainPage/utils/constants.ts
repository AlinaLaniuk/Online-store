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
export const separateSymbol: string = "↕";

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
  filterList: {
    category: {} as { [key: string]: number },
    brand: {} as { [key: string]: number },
    price: {
      min: 0 as number | undefined,
      max: 0 as number | undefined,
    },
    stock: {
      min: 0 as number | undefined,
      max: 0 as number | undefined,
    },
  },
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

export function setMainValuesFromQueryParams(
  categoryParam: string,
  brandParam: string,
  priceParam: string,
  stockParam: string,
  sortParam: string,
  searchParam: string,
  bigParam: string
) {
  view.default = false;
  if (categoryParam) {
    categoryParam.split(separateSymbol).forEach((item) => {
      view.filter.category.push(item);
    });
  }

  if (brandParam) {
    brandParam.split(separateSymbol).forEach((item) => {
      view.filter.brand.push(item);
    });
  }

  if (priceParam) {
    const priceRange = priceParam.split(separateSymbol);
    view.filter.price.min = parseInt(priceRange[0]);
    view.filter.price.max = parseInt(priceRange[1]);
  }

  if (stockParam) {
    const stockRange = stockParam.split(separateSymbol);
    view.filter.stock.min = parseInt(stockRange[0]);
    view.filter.stock.max = parseInt(stockRange[1]);
  }

  if (sortParam) {
    const sortOption = sortParam.split("-");
    view.sort.key = sortOption[0];
    view.sort.direction = sortOption[1].toLowerCase();
  }

  if (searchParam) {
    view.search = searchParam;
  }

  if (bigParam) {
    view.isBig = bigParam === 'true' ? true : false;
  }
}
