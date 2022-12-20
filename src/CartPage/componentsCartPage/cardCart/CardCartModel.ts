import { productInfoType, productsInfo } from "../../types";
import viewCallbacksI from "./cardCartTypes";
import onlineStoreData from "../../../data/data";
import { productsQuantityInCart, totalCost } from "../../../services/appServices";
class CardCartModel{
    viewCallbacks: viewCallbacksI;
    constructor(viewCallbacks: viewCallbacksI){
        this.viewCallbacks = viewCallbacks;
    }

    getCurrentProductsInCartInfo(){
        const productsIndexInCart = Object.keys(productsQuantityInCart);
        return productsIndexInCart.map((index) => onlineStoreData[+index] );
    }

    increaseProductQuantity(productId: string){
        productsQuantityInCart[productId] += 1;
        this.viewCallbacks.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
        this.drawNewCostPerProduct(productId);
        this.setTotalCountPerCart()
    }

    decreaseProductQuantity(productId: string){
        if(productsQuantityInCart[productId] === 1){
            this.deleteProductFromCart(productId)
        } else {
            productsQuantityInCart[productId] -= 1; 
            this.viewCallbacks.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
            this.drawNewCostPerProduct(productId);
        }
        this.setTotalCountPerCart()
    }

    deleteProductFromCart(productId: string){
        delete productsQuantityInCart[productId];
        this.viewCallbacks.deleteCard(productId);
    }
    
    drawCards(){
        const productsInCartData = this.getCurrentProductsInCartInfo();
        productsInCartData.forEach((productData, index) => {
            const productDataIdStr = `${productData.id}`;
            const productQuantity = productsQuantityInCart[productDataIdStr];
            this.viewCallbacks.drawStartState(productData, index, productQuantity);
            const totalPrice = this.setTotalCostPerProduct(productData.id);
            this.viewCallbacks.drawTotalCostPerProduct(`${productData.id}`, totalPrice);
        })
    }

    drawNewCostPerProduct(productId: string){
        this.viewCallbacks.drawTotalCostPerProduct(productId, this.setTotalCostPerProduct(+productId))
    }

    setTotalCountPerCart(){
        const productsIndexInCart = Object.keys(productsQuantityInCart);
        totalCost: productsIndexInCart.reduce((acc, index) => acc + (onlineStoreData[+index].price * productsQuantityInCart[index]), 0);
    }

    setTotalCostPerProduct(productId: number){
        const pricePerUnit = onlineStoreData[+productId].price;
        const totalCost = pricePerUnit * productsQuantityInCart[productId];
        return totalCost;
    }
}
export default CardCartModel;
