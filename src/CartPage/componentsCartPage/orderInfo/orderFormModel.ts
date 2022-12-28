interface viewCallbacksI{
    showError: (inputElem: HTMLElement, isError: boolean) => void,
}

class OrderFormModel{
    viewCallbacks: viewCallbacksI;
    constructor(viewCallbacks: viewCallbacksI){
        this.viewCallbacks = viewCallbacks;
    }

    validateNameValue(inputValue: string, inputElem: HTMLElement){
        const arrayOfInputValue = inputValue.split(' ');
        if(arrayOfInputValue.length === 2 && arrayOfInputValue[0].length >= 3 && arrayOfInputValue[1].length >= 3){
            this.viewCallbacks.showError(inputElem, false);
        } else {
            this.viewCallbacks.showError(inputElem, true);
        }

    }
}
export default OrderFormModel