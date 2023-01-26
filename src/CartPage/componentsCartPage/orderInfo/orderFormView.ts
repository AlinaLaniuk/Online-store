class OrderFormView{
    mainWrapper: HTMLElement;
    constructor(){
        this.mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
    }
    drawOrderForm(){
        const cartContainer = document.querySelector('.cart-container') as HTMLElement;
        const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        const cloneOrderFormTemplate = orderFormTemplate.content.cloneNode(true);
        cartContainer.append(cloneOrderFormTemplate);
    }

    setErrorView(inputElem: HTMLElement, isValueCorrect: boolean){
        const inputParent = inputElem.parentNode as HTMLElement;
        const errorElem = inputParent.querySelector('.error') as HTMLElement;
        if(isValueCorrect){
            errorElem.classList.add('hide');
        } else {
            errorElem.classList.remove('hide');
        }
    }

    hideCardImg(inputElem: HTMLElement){
        const parentElem = inputElem.parentNode as HTMLElement;
        const img = parentElem.querySelector('.bank-system-img') as HTMLImageElement;
        img.src = '';
    }

    setCurrentBankImg(inputElem: HTMLElement, imgPath: string){
        const parentElem = inputElem.parentNode as HTMLElement;
        const img = parentElem.querySelector('.bank-system-img') as HTMLImageElement;
        img.src = imgPath;
    }

    showErrorInCommonErrorBlock(inputName: string, isItError: boolean){
        const errorBlock = document.querySelector('.error-block') as HTMLElement;
        const currentError = errorBlock.querySelector(`.${inputName}-error`) as HTMLElement;
        if(isItError){
            currentError.classList.add('hide');
        } else {
            currentError.classList.remove('hide');
        }
    }
}
export default OrderFormView