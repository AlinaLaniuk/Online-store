import { productInfoType, productsInfo } from "../../types";
import onlineStoreData from "../../../data/data";
import productsIndexInCart from "../../../services/appServices";
class CardCartModel{
    drawStartState: (productInfo: productInfoType, index: number) => void;
    constructor(drawStartState: (productInfo: productInfoType, index: number) => void){
        this.drawStartState = drawStartState;
}
    gerCurrentProductsInCartInfo(){
        return productsIndexInCart.map((index) => onlineStoreData[index] );
    }
    drawCards(){
        const productsInCartData = this.gerCurrentProductsInCartInfo();
        productsInCartData.forEach((productData, index) => {
            this.drawStartState(productData, index)
        })
    }
}
export default CardCartModel;
