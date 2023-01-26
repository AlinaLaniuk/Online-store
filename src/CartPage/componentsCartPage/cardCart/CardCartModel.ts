import IViewCallbacks from "./cardCartTypes";
import onlineStoreData from "../../../data/onlineStoreData";
import { productsInCartInfo } from "../../../services/appServices";
import paginationServices from "../paginationServices";
class CardCartModel{
    viewCallbacks: IViewCallbacks;
    currentIndexes: number[];
    currentCardsNumbers: number[];
    constructor(viewCallbacks: IViewCallbacks){
        this.viewCallbacks = viewCallbacks;
        this.currentIndexes = [];
        this.currentCardsNumbers = [];
    }

    setCurrentIndexes(){
        this.currentIndexes = [...paginationServices.currentIndexesForDrawingCards];
    }

    setCurrentCardsNumbers(){
        this.currentCardsNumbers = [...paginationServices.currentCardsNumbers];
    }

    getCurrentProductsInCartInfo(){
        return this.currentIndexes.map((index) => onlineStoreData[index] );
    }

    increaseProductQuantity(productId: string){
        const productQuantityValue = productsInCartInfo.quantity[productId];
        if(productQuantityValue < onlineStoreData[+productId].stock){
            const newProductQuantityValue = productQuantityValue + 1;
            productsInCartInfo.changeQuantity(productId, newProductQuantityValue);
            this.viewCallbacks.drawNewProductQuantity(productId, productsInCartInfo.quantity[productId]);
            this.drawNewCostPerProduct(productId);
        }
    }

    decreaseProductQuantity(productId: string){
        const productQuantityValue = productsInCartInfo.quantity[productId];
        if(productsInCartInfo.quantity[productId] === 1){
            productsInCartInfo.changeQuantity(productId, 0);
        } else {
            const newProductQuantityValue = productQuantityValue - 1;
            productsInCartInfo.changeQuantity(productId, newProductQuantityValue); 
            this.viewCallbacks.drawNewProductQuantity(productId, productsInCartInfo.quantity[productId]);
            this.drawNewCostPerProduct(productId);
        }
    }

    deleteProductFromCart(productId: string){
        this.viewCallbacks.deleteCard(productId);
    }
    
    drawCards(){
        const productsInCartData = this.getCurrentProductsInCartInfo();
        this.viewCallbacks.deleteCurrentCards();
        productsInCartData.forEach((productData, index) => {
            const productDataIdStr = `${productData.id}`;
            const productQuantity = productsInCartInfo.quantity[productDataIdStr];
            this.viewCallbacks.drawStartState(productData, this.currentCardsNumbers[index], productQuantity);
            const totalPrice = this.setTotalCostPerProduct(productData.id);
            this.viewCallbacks.drawTotalCostPerProduct(`${productData.id}`, totalPrice);
        })
    }

    drawNewCostPerProduct(productId: string){
        this.viewCallbacks.drawTotalCostPerProduct(productId, this.setTotalCostPerProduct(+productId))
    }

    setTotalCostPerProduct(productId: number){
        const pricePerUnit = onlineStoreData[+productId].price;
        const totalCost = pricePerUnit * productsInCartInfo.quantity[productId];
        return totalCost;
    }
}
export default CardCartModel;
