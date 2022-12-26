class SummaryView{
    drawStartSummaryState(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const summaryTemplate = document.querySelector('#summary') as HTMLTemplateElement;
        const cloneSummaryTemplate = summaryTemplate.content.cloneNode(true);
        mainWrapper.append(cloneSummaryTemplate);
    }

    drawProductsQuantity(productsQuantity: number){
        const productQuantityContainer = document.querySelector('.summary__product-quantity') as HTMLElement;
        productQuantityContainer.innerHTML = `Products: ${productsQuantity}`;
    }

    drawTotalCostInCart(totalCost: number){
        const totalCostInCartContainer = document.querySelector('.summary__total-cost') as HTMLElement;
        totalCostInCartContainer.innerHTML = `Total: $${totalCost}`;
    }

    drawPromoCodeForAddBlock(promoCode: string, discountSize: number){
        const summaryPromoForAddBlock = document.querySelector('.summary__promo-for-add') as HTMLElement;
        summaryPromoForAddBlock.insertAdjacentHTML(
            'beforeend',
            `<div class="promo-code-field">
                <div class="promo-code-field__title">${promoCode}: ${discountSize}%</div>
                <button class="add-button">Add</button>
            </div>`
        )
        return document.querySelector('.add-button') as HTMLElement;
    }
}
export default SummaryView;