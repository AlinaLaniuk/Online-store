const visaImgPath = '../../../assets/icon/visa.png';
const masterCardImgPath = '../../../assets/icon/visa.png';
const americanExpressImgPath = '../../../assets/icon/americanExpress.png';
class OrderFormView{
    drawOrderForm(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        const cloneOrderFormTemplate = orderFormTemplate.content.cloneNode(true);
        mainWrapper.append(cloneOrderFormTemplate);
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
}
export default OrderFormView