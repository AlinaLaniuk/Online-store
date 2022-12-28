class OrderFormView{
    drawOrderForm(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        const cloneOrderFormTemplate = orderFormTemplate.content.cloneNode(true);
        mainWrapper.append(cloneOrderFormTemplate);
    }

    setErrorView(inputElem: HTMLElement, isError: boolean){
        const inputParent = inputElem.parentNode as HTMLElement;
        const errorElem = inputParent.querySelector('.error') as HTMLElement;
        if(isError){
            errorElem.classList.remove('hide');
        } else {
            errorElem.classList.add('hide');
        }
    }
}
export default OrderFormView