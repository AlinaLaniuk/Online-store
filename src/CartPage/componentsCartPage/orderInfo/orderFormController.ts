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

    debounce(func: Function, ms: number){
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: Event[]) =>{
            const funcCall = () => { func.apply(this, args) };
            clearTimeout(timeout);
            timeout = setTimeout(funcCall, ms);
            funcCall;
        }
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
            const nameInputValue = nameInput.value;
            this.orderFormModel.validateNameValue(nameInputValue, nameInput);
        })
    }

    run(){
        this.orderFormView.drawOrderForm();
        this.setOrderFormBgListener();
        this.setNameInputListener();
    }
}
export default OrderFormController