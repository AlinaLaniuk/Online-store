import CartModel from "./CartModel";
import CartView from "./CartView";
import CardCartController from "./componentsCartPage/cardCart/CardCartController";
import PaginationController from "./componentsCartPage/pagination/PaginationController";
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
        this.cardCartController.run();
        this.paginationController.run();
    }
}
export default CartController;
