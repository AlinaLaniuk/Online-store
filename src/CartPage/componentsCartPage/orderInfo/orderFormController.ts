import OrderFormModel from "./orderFormModel";
import OrderFormView from "./orderFormView";
class OrderFormController{
    orderFormView: OrderFormView;
    orderFormModel: OrderFormModel;
    constructor(){
        this.orderFormView = new OrderFormView();
        this.orderFormModel = new OrderFormModel(
            {
                showError: this.orderFormView.setErrorView,
                setCurrentBankImg: this.orderFormView.setCurrentBankImg,
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

    setEmailInputListener(){
        const emailInput = document.getElementById('email') as HTMLInputElement;
        emailInput.addEventListener('input', () => {
            const emailInputValue = emailInput.value;
            this.orderFormModel.validateEmailValue(emailInputValue, emailInput);
        })
    }

    setCardNumberInputListener(){
        const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
        cardNumberInput.addEventListener('input', () => {
            const cardNumberInputValue = cardNumberInput.value;
            this.orderFormModel.validateCardNumberValue(cardNumberInputValue, cardNumberInput);
        })
    }

    setValidThruInputListener(){
        const validThruInput = document.getElementById('card-thru') as HTMLInputElement;
        validThruInput.addEventListener('input', () => {
            const cardNumberInputValue = validThruInput.value;
            this.orderFormModel.validateThruValue(cardNumberInputValue, validThruInput);
        })
    }

    run(){
        this.orderFormView.drawOrderForm();
        this.setOrderFormBgListener();
        this.setNameInputListener();
        this.setPhoneInputListener();
        this.setDeliverInputListener();
        this.setEmailInputListener();
        this.setCardNumberInputListener();
    }
}
export default OrderFormController