interface viewCallbacksI{
    showError: (inputElem: HTMLElement, isValueCorrect: boolean) => void,
    setCurrentBankImg: (inputElem: HTMLElement, imgPath: string) => void,
}

const minWordsLengthForDelivery = 5;
const minWordsQuantityForDelivery = 3;
const minWordsLengthForName = 3;
const minWordsQuantityForName = 2;
let currentWorldLengthValue: number;
let currentWorldQuantityValue: number;
const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const banksFirstNumbers: { [key: string]: string } = {
    '4': '../../../assets/icon/visa.png',
    '5': '../../../assets/icon/visa.png',
    '3': '../../../assets/icon/americanExpress.png'
}
const banksFirstNumbersValues = [4, 5, 3];
const spaceIndexes = [4, 9, 14];
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

    validateEmailValue(inputValue: string, inputElem: HTMLElement){
        const isEmailCorrect = emailRegexp.test(inputValue);
        this.viewCallbacks.showError(inputElem, isEmailCorrect);
    }

    validateCardNumberValue(inputValue: string, inputElem: HTMLInputElement){
        if(!banksFirstNumbersValues.includes(+inputValue[0])){
            const correctInputValue = inputValue.slice(0, -1);
            inputElem.value = correctInputValue;
        } else {
            const currentImgPath = banksFirstNumbers[inputValue[0]] as string;
            this.viewCallbacks.setCurrentBankImg(inputElem, currentImgPath)
        }
        if(Number.isNaN(+inputValue[inputValue.length - 1])){
            const correctInputValue = inputValue.slice(0, -1);
            inputElem.value = correctInputValue
        }
        let newValue = inputElem.value.replace(/\D/g, "");
        newValue = newValue.replace(/(.{4})/g, "$1 ");
        inputElem.value = newValue;
        const isCardNumberCorrect = inputElem.value.length === 20;
        // const inputValueArray = inputValue.split('');
        // const inputValueArrayWithoutSpaces = inputValueArray.filter((elem) => {
        //     if(elem === ' '){
        //         return false;
        //     } else {
        //         return true;
        //     }
        // })
        // const newInputValueArrayWithSpaces = spaceIndexes.map((index) => {
        //     inputValueArrayWithoutSpaces.splice(index, 0, ' ');
        // })
        // const newValue = newInputValueArrayWithSpaces.join('');
        // inputElem.value = newValue;
        // const isCardNumberCorrect = inputValueArrayWithoutSpaces.length === 16;
        // console.log(inputValueArrayWithoutSpaces)
        this.viewCallbacks.showError(inputElem, isCardNumberCorrect);
    }

    validateThruValue(inputValue: string, inputElem: HTMLInputElement){
        if(inputValue){

        }
    }
}
export default OrderFormModel