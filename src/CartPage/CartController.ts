import CartModel from "./CartModel";
import CartView from "./CartView";
import CardCartController from "./componentsCartPage/cardCart/CardCartController";
import PaginationController from "./componentsCartPage/pagination/PaginationController";
import SummaryController from "./componentsCartPage/summary/summaryController";
import paginationServices from "./componentsCartPage/paginationServices";
import { productsInCartInfo } from "../services/appServices";
class CartController{
    cartModel: CartModel;
    cartView: CartView;
    cardCartController: CardCartController;
    paginationController: PaginationController;
    summaryController: SummaryController;
    constructor(){
        this.cartModel = new CartModel();
        this.cartView = new CartView();
        this.cardCartController = new CardCartController();
        this.paginationController = new PaginationController();
        this.summaryController = new SummaryController();
    }
    
    runCart(){
        this.cartView.drawProductsInCartBlock();
        // this.cardCartController.run();
        paginationServices.subscribe(this.cardCartController.subscribeToPaginationDataChanging);
        this.paginationController.run();
        productsInCartInfo.subscribe(this.paginationController.subscribeToAppServicesChanges);
        this.summaryController.run();
        productsInCartInfo.subscribe(this.summaryController.subscribeToTotalQuantityChanging);
    }
}
export default CartController;
