import OrderFormModel from "./orderFormModel";
import OrderFormView from "./orderFormView";
class OrderInfoController{
    orderFormView: OrderFormView;
    orderFormModel: OrderFormModel;
    constructor(){
        this.orderFormView = new OrderFormView();
        this.orderFormModel = new OrderFormModel();
    }

    run(){
        this.orderFormView.drawOrderForm();
    }
}
export default OrderInfoController