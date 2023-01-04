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
    constructor(productPageRun: (id: number) => void){
        this.cartView = new CartView();
        this.cartModel = new CartModel(this.cartView.drawEmptyCartPage);
        this.cardCartController = new CardCartController(productPageRun);
        this.paginationController = new PaginationController();
        this.summaryController = new SummaryController();
        this.orderFormController = new OrderFormController();
    }

    setBuyNowButtonListener(){
        const buyNowButton = document.querySelector('.summary__button') as HTMLElement;
        buyNowButton.addEventListener('click', () => {
            this.orderFormController.run();
        })
    }
    
    runCart(){
        if(productsInCartInfo.totalQuantity === 0){
            
            this.cartView.drawEmptyCartPage();
        } else {
            this.cartView.drawProductsInCartBlock();
            paginationServices.subscribe(this.cardCartController.subscribeToPaginationDataChanging);
            this.paginationController.run();
            productsInCartInfo.subscribe(this.paginationController.subscribeToAppServicesChanges);
            this.summaryController.run();
            productsInCartInfo.subscribe(this.summaryController.subscribeToTotalQuantityChanging);
            productsInCartInfo.subscribe(this.cartView.drawEmptyCartPage);
            this.setBuyNowButtonListener();
        }
    }
}
export default CartController;
