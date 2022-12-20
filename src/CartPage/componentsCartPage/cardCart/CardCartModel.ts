import { productInfoType, productsInfo } from "../../types";
import onlineStoreData from "../../../data/data";
import { productsIndexInCart, productsQuantityInCart } from "../../../services/appServices";
class CardCartModel{
    drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void;
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void

    constructor(drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void,
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void
    ){
        this.drawStartState = drawStartState;
        this.drawNewProductQuantity = drawNewProductQuantity;
    }

    getCurrentProductsInCartInfo(){
        return productsIndexInCart.map((index) => onlineStoreData[index] );
    }

    increaseProductQuantity(productId: string){
        productsQuantityInCart[productId] += 1;
        this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
    }

    decreaseProductQuantity(productId: string){
        if(productsQuantityInCart[productId] > 0){
            productsQuantityInCart[productId] -= 1; 
        }
        this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
    }
    
    drawCards(){
        const productsInCartData = this.getCurrentProductsInCartInfo();
        productsInCartData.forEach((productData, index) => {
            const productDataIdStr = `${productData.id}`;
            const productQuantity = productsQuantityInCart[productDataIdStr];
            this.drawStartState(productData, index, productQuantity)
        })
    }
}
export default CardCartModel;
