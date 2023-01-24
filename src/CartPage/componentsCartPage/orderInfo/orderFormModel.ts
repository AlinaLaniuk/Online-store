interface IViewCallbacks{
    showError: (inputElem: HTMLElement, isValueCorrect: boolean) => void,
    setCurrentBankImg: (inputElem: HTMLElement, imgPath: string) => void,
    showErrorInCommonErrorBlock: (inputName: string, isItError: boolean) => void,
    hideCardImg: (inputElem: HTMLElement) => void
}
interface IValidInput {
    name: boolean,
    phone: boolean,
    delivery: boolean,
    email: boolean,
    cardNumber: boolean,
    thru: boolean,
    cvv: boolean
}
type typeOfField = 'name' | 'delivery';
type validInputKeys = 'name' | 'phone' | 'delivery' | 'email' | 'cardNumber' | 'thru' | 'cvv';
const minWordsLengthForDelivery = 5;
const minWordsQuantityForDelivery = 3;
const minWordsLengthForName = 3;
const minWordsQuantityForName = 2;
const indexForSlash = 2;
const firstNumberCharInPhone = 2;
const maxPhoneLength = 10;
const maxBankCardLengthWithSpaces = 19;
const monthQuantity = 12;
const maxDozen = `${monthQuantity}`[0];
const maxCvvLength = 3;
const maxDateLength = 5;
let currentWorldLengthValue: number;
let currentWorldQuantityValue: number;
const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const banksFirstNumbers: { [key: string]: string } = {
    '4': '../../../assets/icon/visa.png',
    '5': '../../../assets/icon/MasterCard.png', 
    '3': '../../../assets/icon/americanExpress.png',
}
const banksFirstNumbersValues = [4, 5, 3];
 
class OrderFormModel{
    viewCallbacks: IViewCallbacks;
    validInputs: IValidInput;
    isCommonBlockOpen: boolean;
    constructor(viewCallbacks: IViewCallbacks){
        this.viewCallbacks = viewCallbacks;
        this.validInputs = {
            name: false,
            phone: false,
            delivery: false,
            email: false,
            cardNumber: false,
            thru: false,
            cvv: false
        };
        this.isCommonBlockOpen = false;
    }

    clearOrderFormData(){
        this.validInputs = {
            name: false,
            phone: false,
            delivery: false,
            email: false,
            cardNumber: false,
            thru: false,
            cvv: false
        };
        this.isCommonBlockOpen = false;
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
        (inputValue.length >= firstNumberCharInPhone && !isPhoneConsistOfNumbers) ||
        (isPhoneConsistOfNumbers && inputValue.length < maxPhoneLength) 
        
        ){
            isValueCorrect = false;
        } 
        this.viewCallbacks.showError(inputElem, isValueCorrect);
        this.validInputs.phone = isValueCorrect;
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    validateDeliveryAndNameValue(inputValue: string, inputElem: HTMLElement, typeOfField: typeOfField){
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
        this.validInputs[typeOfField] = isValueCorrect;
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    validateEmailValue(inputValue: string, inputElem: HTMLElement){
        const isEmailCorrect = emailRegexp.test(inputValue);
        this.viewCallbacks.showError(inputElem, isEmailCorrect);
        this.validInputs.email = isEmailCorrect;
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    validateCardNumberValue(inputValue: string, eventData: string, inputElem: HTMLInputElement){
        if(!banksFirstNumbersValues.includes(+inputValue[0])){
            this.viewCallbacks.hideCardImg(inputElem);
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
        if(eventData && inputValue.length < maxBankCardLengthWithSpaces){
            let newValue = inputElem.value.replace(/\D/g, "");
            newValue = newValue.replace(/(.{4})/g, "$1 ");
            inputElem.value = newValue;
        }
        const isCardNumberCorrect = inputElem.value.length === maxBankCardLengthWithSpaces;
        this.viewCallbacks.showError(inputElem, isCardNumberCorrect);
        this.validInputs.cardNumber = isCardNumberCorrect;
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    checkIsValueNumber(inputElem: HTMLInputElement){
        const inputValueArray = inputElem.value.split('');
        const correctInputValueArray = inputValueArray.filter((elem, index) => {
            if(!Number.isNaN(+elem) || (elem === '/' && index === indexForSlash)){
                return true;
            } else {
                return false;
            }
        })
        inputElem.value = correctInputValueArray.join('');
    }

    addZeroToMonth(inputElem: HTMLInputElement){
        if(+inputElem.value[0] >= +maxDozen){
            const correctInputValue = `0${inputElem.value.slice(0, 1)}`;
            inputElem.value = correctInputValue
        }
    }

    checkIsMonthTwoDigitNumber(inputElem: HTMLInputElement){
        const inputValueArrayWithoutSlash = inputElem.value.split('/');
        const monthValue = inputValueArrayWithoutSlash[0];
        if(monthValue.length > 2){
            const correctMonthValue = monthValue.slice(0, 2);
            inputValueArrayWithoutSlash[0] = correctMonthValue;
            inputElem.value = inputValueArrayWithoutSlash.join('/');
        }
    }

    checkIsMonthCorrect(inputElem: HTMLInputElement){
        const inputValueArrayWithoutSlash = inputElem.value.split('/');
        const monthValue = inputValueArrayWithoutSlash[0];
        const isMonthValueCorrect = +monthValue <= monthQuantity && +monthValue !== 0;
        this.viewCallbacks.showError(inputElem, isMonthValueCorrect);
    }

    addSlash(inputElem: HTMLInputElement){
        const inputValueArray = inputElem.value.split('/');
        if(inputValueArray.length === 1 && inputElem.value.length === 2){
            const inputValueWithSlash = `${inputElem.value}/`;
            inputElem.value = inputValueWithSlash;
        }
    }

    checkIsDateCardValid(inputElem: HTMLInputElement){
        const inputValue = inputElem.value;
        let isValueCorrect = false;
        const inputValueArray = inputValue.split('/');
        if(+inputValueArray[0] <= monthQuantity && inputValue.length === maxDateLength){
            isValueCorrect = true;
        }
        this.validInputs.thru = isValueCorrect;
    }

    validateThruValue(inputElem: HTMLInputElement){
        this.checkIsValueNumber(inputElem);
        this.addZeroToMonth(inputElem);
        this.checkIsMonthTwoDigitNumber(inputElem);
        this.checkIsMonthCorrect(inputElem);
        this.addSlash(inputElem);
        this.checkIsDateCardValid(inputElem);
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    validateCvvValue(inputValue: string, inputElem: HTMLInputElement){
        if(Number.isNaN(+inputValue[inputValue.length - 1])){
            const correctInputValue = inputValue.slice(0, -1);
            inputElem.value = correctInputValue
        }
        let isValueCorrect = false;
        if(inputElem.value.length === maxCvvLength){
            isValueCorrect = true;
        }
        this.viewCallbacks.showError(inputElem, isValueCorrect);
        this.validInputs.cvv = isValueCorrect;
        if(this.isCommonBlockOpen){
            this.showCommonErrorBlock();
        }
    }

    showCommonErrorBlock(){
        this.isCommonBlockOpen = true;
        for (let validInputsKey in this.validInputs){
            this.viewCallbacks.showErrorInCommonErrorBlock(validInputsKey, this.validInputs[validInputsKey as validInputKeys])
        }
    }

    checkValidInputs(){
        const validInputsValues = Object.values(this.validInputs);
        return !validInputsValues.filter((elem) => !elem).length;
    }
}
export default OrderFormModel