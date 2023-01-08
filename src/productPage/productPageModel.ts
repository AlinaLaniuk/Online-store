import onlineStoreData from "../data/data";
import { productInfoType } from "../CartPage/types";
class ProductPageModel {
  drawProductPage: (data: productInfoType) => void;
  getSmallImagesList: (data: productInfoType) => void;

  constructor(
    drawProductPage: (data: productInfoType) => void,
    getSmallImagesList: (data: productInfoType) => void,
  ) {
    this.drawProductPage = drawProductPage;
    this.getSmallImagesList = getSmallImagesList;
  }

  drawCurrentProductPage(id: number) {
    this.drawProductPage(onlineStoreData[id]);
    this.getSmallImagesList(onlineStoreData[id]);
  }
}
export default ProductPageModel;
