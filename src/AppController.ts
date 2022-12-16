import CartController from "./CartPage/CartController";
class AppController{
    cartPageController: CartController;
    constructor(){
        this.cartPageController = new CartController();
    }
    run(){
        this.cartPageController.runCart();
    }
}
export default AppController;
