class CartView{
    drawProductsInCartBlock(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const productsInCart = document.querySelector('#products-in-cart') as HTMLTemplateElement;
        const cloneProductsInCartTemplate = productsInCart.content.cloneNode(true);
        mainWrapper.append(cloneProductsInCartTemplate);
    }

    drawEmptyCartPage(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        mainWrapper.innerHTML = '';
        mainWrapper.insertAdjacentHTML(
            'beforeend',
            `<div>Cart is Empty</div`
        )
    }
}
export default CartView;
