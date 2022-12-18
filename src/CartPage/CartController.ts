import CartModel from "./CartModel";
import CartView from "./CartView";
import CardCartController from "./componentsCartPage/cardCart/CardCartController";
class CartController{
    cartModel: CartModel;
    cartView: CartView;
    cardCartController: CardCartController;
    constructor(){
        this.cartModel = new CartModel();
        this.cartView = new CartView();
        this.cardCartController = new CardCartController();
    }
    runCart(){
        this.cartView.drawProductsInCartBlock();
        this.cardCartController.run();
    }
}
export default CartController;
