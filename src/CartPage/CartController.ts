import CartModel from "./CartModel";
import CartView from "./CartView";
import CardCartController from "./componentsCartPage/cardCart/CardCartController";
import PaginationController from "./componentsCartPage/pagination/PaginationController";
import paginationServices from "./componentsCartPage/paginationServices";
import { productsInCartInfo } from "../services/appServices";
class CartController{
    cartModel: CartModel;
    cartView: CartView;
    cardCartController: CardCartController;
    paginationController: PaginationController;
    constructor(){
        this.cartModel = new CartModel();
        this.cartView = new CartView();
        this.cardCartController = new CardCartController();
        this.paginationController = new PaginationController();
    }
    
    runCart(){
        this.cartView.drawProductsInCartBlock();
        // this.cardCartController.run();
        paginationServices.subscribe(this.cardCartController.subscribeToPaginationDataChanging);
        this.paginationController.run();
        productsInCartInfo.subscribe(this.paginationController.subscribeToAppServicesChanges);
    }
}
export default CartController;
