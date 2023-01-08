import CartModel from "./CartModel";
import CartView from "./CartView";
import CardCartController from "./componentsCartPage/cardCart/CardCartController";
import PaginationController from "./componentsCartPage/pagination/PaginationController";
import SummaryController from "./componentsCartPage/summary/summaryController";
import OrderFormController from "./componentsCartPage/orderInfo/orderFormController";
import paginationServices from "./componentsCartPage/paginationServices";
import { productsInCartInfo } from "../services/appServices";
class CartController{
    cartModel: CartModel;
    cartView: CartView;
    cardCartController: CardCartController;
    paginationController: PaginationController;
    summaryController: SummaryController;
    orderFormController: OrderFormController;
    constructor(productPageRun: (id: number) => void, redirectToMain: (isAllInputsValid: boolean) => void){
        this.cartView = new CartView();
        this.cartModel = new CartModel(this.cartView.drawEmptyCartPage);
        this.cardCartController = new CardCartController(productPageRun);
        this.paginationController = new PaginationController();
        this.summaryController = new SummaryController();
        this.orderFormController = new OrderFormController(redirectToMain);
        this.updateCartState = this.updateCartState.bind(this);
        this.updatePaginationState = this.updatePaginationState.bind(this);
    }

    setBuyNowButtonListener(){
        const buyNowButton = document.querySelector('.summary__button') as HTMLElement;
        buyNowButton.addEventListener('click', () => {
            this.orderFormController.run();
        })
    }

    updateCartState(){
        if(productsInCartInfo.totalQuantity === 0){
            this.cartView.drawEmptyCartPage();
        } else {
            this.paginationController.updateCurrentIndexesForCards();
            this.summaryController.updateSummaryInfo();
        }
    }

    updatePaginationState(){
        if(productsInCartInfo.totalQuantity !== 0){
            this.cardCartController.updateCards();
        }
    }
    
    runCart(){
        if(productsInCartInfo.totalQuantity === 0){
            this.cartView.drawEmptyCartPage();
        } else {        
            this.cartView.drawProductsInCartBlock();
            this.paginationController.run();
            this.summaryController.run();
            this.setBuyNowButtonListener();
            this.cardCartController.updateCards();
            productsInCartInfo.subscribe(this.updateCartState);
            paginationServices.subscribe(this.updatePaginationState);
        }
    }
}
export default CartController;
