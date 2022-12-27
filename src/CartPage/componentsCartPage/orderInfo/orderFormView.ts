class OrderFormView{
    drawOrderForm(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
        const cloneOrderFormTemplate = orderFormTemplate.content.cloneNode(true);
        mainWrapper.append(cloneOrderFormTemplate);
    }
}
export default OrderFormView