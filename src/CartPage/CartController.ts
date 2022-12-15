import CartModel from "./CartModel";
import CartView from "./CartView";
class CartController{
    CartModel: CartModel;
    CartView: CartView;
    constructor(){
        this.CartModel = new CartModel();
        this.CartView = new CartView();
    }
}
export default CartController;
