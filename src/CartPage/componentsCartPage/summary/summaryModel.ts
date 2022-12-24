import { productsInCartInfo } from "../../../services/appServices";
class SummaryModel{
    drawProductsQuantity: (productsQuantity: number) => void;
    constructor(drawProductsQuantity: (productsQuantity: number) => void){
        this.drawProductsQuantity = drawProductsQuantity;
    }

    drawNewProductsQuantity(){
        this.drawProductsQuantity(productsInCartInfo.totalQuantity);
    }

}
export default SummaryModel;