import { productInfoType, productsInfo } from "../../types";
import onlineStoreData from "../../../data/data";
import { productsQuantityInCart } from "../../../services/appServices";
class CardCartModel{
    drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void;
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void;
    deleteCard: (productId: string) => void
    constructor(drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void,
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void,
    deleteCard: (productId: string) => void,
    ){
        this.drawStartState = drawStartState;
        this.drawNewProductQuantity = drawNewProductQuantity;
        this.deleteCard = deleteCard;
    }

    getCurrentProductsInCartInfo(){
        const productsIndexInCart = Object.keys(productsQuantityInCart);
        return productsIndexInCart.map((index) => onlineStoreData[+index] );
    }

    increaseProductQuantity(productId: string){
        productsQuantityInCart[productId] += 1;
        this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
    }

    decreaseProductQuantity(productId: string){
        if(productsQuantityInCart[productId] === 1){
            this.deleteProductFromCart(productId)
        } else {
            productsQuantityInCart[productId] -= 1; 
            this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
        }
    }

    deleteProductFromCart(productId: string){
        delete productsQuantityInCart[productId];
        this.deleteCard(productId);
    }

    drawCards(){
        const productsInCartData = this.getCurrentProductsInCartInfo();
        productsInCartData.forEach((productData, index) => {
            const productDataIdStr = `${productData.id}`;
            const productQuantity = productsQuantityInCart[productDataIdStr];
            this.drawStartState(productData, index, productQuantity)
        })
    }

    setTotalCostPerProduct(productId: string){
        const pricePerUnit = onlineStoreData[+productId].price;
        const totalCost = pricePerUnit * productsQuantityInCart[productId];
        
    }
}
export default CardCartModel;
