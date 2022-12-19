export interface IDataItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface filterOption {
  option: string;
  type: string;
  min?: number;
  max?: number;
}

export interface filterCheckboxItem {
  title: string;
  items: number;
}

export interface IRange {
  min: number;
  max: number;
}