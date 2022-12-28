interface viewCallbacksI{
    showError: (inputElem: HTMLElement, isValueCorrect: boolean) => void,
}

const minWordsLengthForDelivery = 5;
const minWordsQuantityForDelivery = 3;
const minWordsLengthForName = 3;
const minWordsQuantityForName = 2;
let currentWorldLengthValue: number;
let currentWorldQuantityValue: number;
class OrderFormModel{
    viewCallbacks: viewCallbacksI;
    constructor(viewCallbacks: viewCallbacksI){
        this.viewCallbacks = viewCallbacks;
    }

    setCurrentValuesForValidateNameAndDeliveryInputs(typeOfInput: string){
        if(typeOfInput === 'delivery'){
            currentWorldLengthValue = minWordsLengthForDelivery;
            currentWorldQuantityValue = minWordsQuantityForDelivery;
        } else if (typeOfInput === 'name'){
            currentWorldLengthValue = minWordsLengthForName;
            currentWorldQuantityValue = minWordsQuantityForName;
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

    validateDeliveryAndNameValue(inputValue: string, inputElem: HTMLElement){

        if(inputElem.classList.contains('delivery')){

        }
        const arrayOfInputValue = inputValue.split(' ');
        let isWordsLengthCorrect = true;
        let isValueCorrect = true;
        for(let i = 0; i < arrayOfInputValue.length; i += 1){
            if(arrayOfInputValue[i].length < currentWorldLengthValue){
                isWordsLengthCorrect = false;
                break;
            }
        }
        if((isWordsLengthCorrect && arrayOfInputValue.length < currentWorldQuantityValue) ||
            !isWordsLengthCorrect
            ){
                isValueCorrect = false;
        }
        this.viewCallbacks.showError(inputElem, isValueCorrect);
    }
}
export default OrderFormModel