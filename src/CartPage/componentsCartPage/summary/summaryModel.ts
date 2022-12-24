import { productsInCartInfo } from "../../../services/appServices";
class SummaryModel{
    drawProductsQuantity: (productsQuantity: number) => void;
    drawTotalCostInCart: (totalCost: number) => void;
    constructor(drawProductsQuantity: (productsQuantity: number) => void, drawTotalCostInCart: (totalCost: number) => void){
        this.drawProductsQuantity = drawProductsQuantity;
        this.drawTotalCostInCart = drawTotalCostInCart
    }

    drawNewProductsQuantity(){
        this.drawProductsQuantity(productsInCartInfo.totalQuantity);
    }

    drawNewTotalCostInCart(){
        this.drawTotalCostInCart(productsInCartInfo.totalCost);
    }

}
export default SummaryModel;