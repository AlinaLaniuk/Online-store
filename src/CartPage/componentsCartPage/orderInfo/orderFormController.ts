import OrderFormModel from "./orderFormModel";
import OrderFormView from "./orderFormView";
class OrderFormController{
    orderFormView: OrderFormView;
    orderFormModel: OrderFormModel;
    constructor(){
        this.orderFormView = new OrderFormView();
        this.orderFormModel = new OrderFormModel(
            {
                showError: this.orderFormView.setErrorView
            }
        );
    }

    setOrderFormBgListener(){
        const orderFormBg = document.querySelector('.order-background') as HTMLElement;
        orderFormBg.addEventListener('click', (event) => {
            const eventTarget = event.target;
            if(eventTarget === orderFormBg){
                const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
                mainWrapper.removeChild(orderFormBg);
            }
        })
    }

    setNameInputListener(){
        const nameInput = document.getElementById('name') as HTMLInputElement;
        nameInput.addEventListener('input', () => {
            this.orderFormModel.setCurrentValuesForValidateNameAndDeliveryInputs('name');
            const nameInputValue = nameInput.value;
            this.orderFormModel.validateDeliveryAndNameValue(nameInputValue, nameInput);
        })
    }

    setPhoneInputListener(){
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        phoneInput.addEventListener('input', () => {
            const nameInputValue = phoneInput.value;
            this.orderFormModel.validatePhoneValue(nameInputValue, phoneInput);
        })
    }

    setDeliverInputListener(){
        const deliveryInput = document.getElementById('delivery') as HTMLInputElement;
        deliveryInput.addEventListener('input', () => {
            this.orderFormModel.setCurrentValuesForValidateNameAndDeliveryInputs('delivery');
            const nameInputValue = deliveryInput.value;
            this.orderFormModel.validateDeliveryAndNameValue(nameInputValue, deliveryInput);
        })
    }

    run(){
        this.orderFormView.drawOrderForm();
        this.setOrderFormBgListener();
        this.setNameInputListener();
        this.setPhoneInputListener();
        this.setDeliverInputListener();
    }
}
export default OrderFormController