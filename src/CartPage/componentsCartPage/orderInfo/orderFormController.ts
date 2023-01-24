import OrderFormModel from "./orderFormModel";
import OrderFormView from "./orderFormView";
class OrderFormController{
    orderFormView: OrderFormView;
    orderFormModel: OrderFormModel;
    redirectToMain: (isAllInputsValid: boolean) => void
    constructor(redirectToMain: (isAllInputsValid: boolean) => void){
        this.orderFormView = new OrderFormView();
        this.orderFormModel = new OrderFormModel(
            {
                showError: this.orderFormView.setErrorView,
                setCurrentBankImg: this.orderFormView.setCurrentBankImg,
                showErrorInCommonErrorBlock: this.orderFormView.showErrorInCommonErrorBlock,
                hideCardImg: this.orderFormView.hideCardImg,
            },
        );
        this.redirectToMain = redirectToMain;
    }

    setOrderFormBgListener(){
        const orderFormBg = document.querySelector('.order-background') as HTMLElement;
        orderFormBg.addEventListener('click', (event) => {
            if(event.target === orderFormBg){
                const cartContainer = document.querySelector('.cart-container') as HTMLElement;
                cartContainer.removeChild(orderFormBg);
            }
        })
    }

    setNameInputListener(){
        const nameInput = document.getElementById('name') as HTMLInputElement;
        nameInput.addEventListener('input', () => {
            this.orderFormModel.setCurrentValuesForValidateNameAndDeliveryInputs('name');
            const nameInputValue = nameInput.value;
            this.orderFormModel.validateDeliveryAndNameValue(nameInputValue, nameInput, 'name');
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
            this.orderFormModel.validateDeliveryAndNameValue(nameInputValue, deliveryInput, 'delivery');
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
        cardNumberInput.addEventListener('input', (event) => {
            const currentEvent = event as InputEvent;
            const eventData = currentEvent.data as string;
            const cardNumberInputValue = cardNumberInput.value;
            this.orderFormModel.validateCardNumberValue(cardNumberInputValue, eventData, cardNumberInput);
        })
    }

    setValidThruInputListener(){
        const validThruInput = document.getElementById('card-thru') as HTMLInputElement;
        validThruInput.addEventListener('input', () => { 
            this.orderFormModel.validateThruValue(validThruInput);
        })
    }

    setValidCvvInputListener(){
        const cvvInput = document.getElementById('cvv') as HTMLInputElement;
        cvvInput.addEventListener('input', () => {
            const cvvInputValue = cvvInput.value;
            this.orderFormModel.validateCvvValue(cvvInputValue, cvvInput);
        })
    }

    setConfirmButtonListener(){
        const confirmButton = document.querySelector('.confirm-button') as HTMLButtonElement;
        confirmButton.addEventListener('click', () => {
            const isAllInputsValid = this.orderFormModel.checkValidInputs();
            this.orderFormModel.showCommonErrorBlock();
            this.redirectToMain(isAllInputsValid);
        })
    }

    run(){
        this.orderFormView.drawOrderForm();
        this.orderFormModel.clearOrderFormData();
        this.setOrderFormBgListener();
        this.setNameInputListener();
        this.setPhoneInputListener();
        this.setDeliverInputListener();
        this.setEmailInputListener();
        this.setCardNumberInputListener();
        this.setValidThruInputListener();
        this.setValidCvvInputListener();
        this.setConfirmButtonListener();
    }
}
export default OrderFormController