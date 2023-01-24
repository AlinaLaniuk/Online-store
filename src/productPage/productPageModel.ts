import onlineStoreData from "../data/onlineStoreData";
import { productInfoType } from "../CartPage/types";
class ProductPageModel {
  drawProductPage: (data: productInfoType) => void;
  getSmallImagesList: (data: productInfoType) => void;
  handleAddBtnState: (data: productInfoType) => void;

  constructor(
    drawProductPage: (data: productInfoType) => void,
    getSmallImagesList: (data: productInfoType) => void,
    handleAddBtnState: (data: productInfoType) => void,
  ) {
    this.drawProductPage = drawProductPage;
    this.getSmallImagesList = getSmallImagesList;
    this.handleAddBtnState = handleAddBtnState;
  }

  drawCurrentProductPage(id: number) {
    this.drawProductPage(onlineStoreData[id]);
    this.getSmallImagesList(onlineStoreData[id]);
    this.handleAddBtnState(onlineStoreData[id]);
  }
}
export default ProductPageModel;
