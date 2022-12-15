import CartController from "./CartPage/CartController";
class AppController{
    cartPageController: CartController;
    constructor(){
        this.cartPageController = new CartController();
    }
}
export default AppController;
