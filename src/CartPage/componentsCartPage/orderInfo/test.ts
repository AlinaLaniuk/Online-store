import OrderFormModel from "./orderFormModel";
import OrderFormView from "./orderFormView";

let model: OrderFormModel;

interface IValidInput {
    name: boolean,
    phone: boolean,
    delivery: boolean,
    email: boolean,
    cardNumber: boolean,
    thru: boolean,
    cvv: boolean
}

beforeAll(() => {
    const view = new OrderFormView();
    model = new OrderFormModel({
        showError: view.setErrorView,
        setCurrentBankImg: view.setCurrentBankImg,
        showErrorInCommonErrorBlock: view.showErrorInCommonErrorBlock,
        hideCardImg: view.hideCardImg,
    });
});

test('Is input value correct?', () => {
    document.body.innerHTML = `
    <input type="text" class="test-input">
    `;
    const input = document.querySelector('.test-input') as HTMLInputElement;
    for(let i = 2; i <= 9; i++){
        input.value = `${i}`;
        model.addZeroToMonth(input)
        expect(input.value).toEqual(`0${i}`)
    }
});

test('Is order form clean?', () => {
    model.validInputs = {
        name: true,
        phone: true,
        delivery: true,
        email: true,
        cardNumber: true,
        thru: true,
        cvv: true
    };
    model.isCommonBlockOpen = true;
    model.clearOrderFormData();
    let isValidInputPropFalse = true;
    for (let prop in model.validInputs){
        isValidInputPropFalse = model.validInputs[prop as keyof IValidInput];
    };
    expect(isValidInputPropFalse).toBe(false);
    expect(model.isCommonBlockOpen).toBe(false);
});



