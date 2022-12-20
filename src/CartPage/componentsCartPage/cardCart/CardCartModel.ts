import { productInfoType, productsInfo } from "../../types";
import onlineStoreData from "../../../data/data";
import { productsQuantityInCart, totalCost } from "../../../services/appServices";
class CardCartModel{
    drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void;
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void;
    deleteCard: (productId: string) => void;
    drawTotalCostPerProduct: (productId: string, totalCost: number) => void;
    constructor(drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void,
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void,
    deleteCard: (productId: string) => void,
    drawTotalCostPerProduct: (productId: string, totalCost: number) => void,
    ){
        this.drawStartState = drawStartState;
        this.drawNewProductQuantity = drawNewProductQuantity;
        this.deleteCard = deleteCard;
        this.drawTotalCostPerProduct = drawTotalCostPerProduct;
    }

    getCurrentProductsInCartInfo(){
        const productsIndexInCart = Object.keys(productsQuantityInCart);
        return productsIndexInCart.map((index) => onlineStoreData[+index] );
    }

    increaseProductQuantity(productId: string){
        productsQuantityInCart[productId] += 1;
        this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
        this.drawNewCostPerProduct(productId);
        this.setTotalCountPerCart()
    }

    decreaseProductQuantity(productId: string){
        if(productsQuantityInCart[productId] === 1){
            this.deleteProductFromCart(productId)
        } else {
            productsQuantityInCart[productId] -= 1; 
            this.drawNewProductQuantity(productId, productsQuantityInCart[productId]);
            this.drawNewCostPerProduct(productId);
        }
        this.setTotalCountPerCart()
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
            this.drawStartState(productData, index, productQuantity);
            const totalPrice = this.setTotalCostPerProduct(productData.id);
            this.drawTotalCostPerProduct(`${productData.id}`, totalPrice);
        })
    }

    drawNewCostPerProduct(productId: string){
        this.drawTotalCostPerProduct(productId, this.setTotalCostPerProduct(+productId))
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
