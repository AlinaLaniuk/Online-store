class CardCartView{
    drawStartState(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const cartTemplate = document.querySelector('#cart-card') as HTMLTemplateElement;
        const cloneCartTemplate = cartTemplate.content.cloneNode(true);
        mainWrapper.append(cloneCartTemplate);
    }
}
export default CardCartView;
