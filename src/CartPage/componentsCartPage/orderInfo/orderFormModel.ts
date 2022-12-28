interface viewCallbacksI{
    showError: (inputElem: HTMLElement, isValueCorrect: boolean) => void,
}

class OrderFormModel{
    viewCallbacks: viewCallbacksI;
    constructor(viewCallbacks: viewCallbacksI){
        this.viewCallbacks = viewCallbacks;
    }

    validateNameValue(inputValue: string, inputElem: HTMLElement){
        const arrayOfInputValue = inputValue.split(' ');
        if(arrayOfInputValue.length === 2 && arrayOfInputValue[0].length >= 3 && arrayOfInputValue[1].length >= 3){
            this.viewCallbacks.showError(inputElem, true);
        } else {
            this.viewCallbacks.showError(inputElem, false);
        }
    }

    validatePhoneValue(inputValue: string, inputElem: HTMLElement){
        let isValueCorrect = true;
        let isPhoneConsistOfNumbers = true;
        for(let i = 1; i < inputValue.length; i += 1){
            if(Number.isNaN(+inputValue[i])){
                isPhoneConsistOfNumbers = false
            }
        }
        if(inputValue[0] !== '+' ||
        (inputValue.length >= 2 && !isPhoneConsistOfNumbers) ||
        (inputValue.length >= 2 && isPhoneConsistOfNumbers && inputValue.length < 10) 
        
        ){
            isValueCorrect = false;
        } 
        this.viewCallbacks.showError(inputElem, isValueCorrect);
    }
}
export default OrderFormModel