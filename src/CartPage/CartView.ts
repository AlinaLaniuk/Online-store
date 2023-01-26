class CartView{
    drawProductsInCartBlock(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');
        mainWrapper.append(cartContainer);
        const productsInCart = document.querySelector('#products-in-cart') as HTMLTemplateElement;
        const cloneProductsInCartTemplate = productsInCart.content.cloneNode(true);
        cartContainer.append(cloneProductsInCartTemplate);
    }

    drawEmptyCartPage(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');
        mainWrapper.innerHTML = '';
        mainWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="empty-card">Cart is Empty</div`
        )
    }
}
export default CartView;
