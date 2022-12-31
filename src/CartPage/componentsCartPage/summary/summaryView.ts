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

    deletePromoCodeBlockForAdd(){
        const summaryPromoForAddBlock = document.querySelector('.summary__promo-for-add') as HTMLElement;
        summaryPromoForAddBlock.innerHTML = '';
    }

    drawPromoCodeForAddBlock(promoCode: string, discountSize: number){
        const summaryPromoForAddBlock = document.querySelector('.summary__promo-for-add') as HTMLElement;
        summaryPromoForAddBlock.innerHTML = '';
        summaryPromoForAddBlock.insertAdjacentHTML(
            'beforeend',
            `<div class="promo-code-field">
                <div class="promo-code-field__title">${promoCode}: ${discountSize}%</div>
                <button data-id="${promoCode}" class="add-button">Add</button>
            </div>`
        )
        return document.querySelector('.add-button') as HTMLElement;
    }

    drawAppliedCodesBlock(promoCode: string, discountSize: number){
        const summaryAppliedCodesBlock = document.querySelector('.summary__applied-codes') as HTMLElement;
        summaryAppliedCodesBlock.classList.remove('hide');
        summaryAppliedCodesBlock.insertAdjacentHTML(
            'beforeend',
            `<div class="promo-code-field">
                <div class="promo-code-field__title">${promoCode}: ${discountSize}%</div>
                <button data-id="${promoCode}" class="drop-button" id="${promoCode}">Drop</button>
            </div>`
        )
        return document.getElementById(`${promoCode}`) as HTMLElement;
    }

    drawPromoCodeInfoBlock(promoCode: string, discountSize: number){
        const summaryPromoForAddBlock = document.querySelector('.summary__promo-for-add') as HTMLElement;
        summaryPromoForAddBlock.innerHTML = '';
        summaryPromoForAddBlock.insertAdjacentHTML(
            'beforeend',
            `<div class="promo-code-field">
                <div class="promo-code-field__title">${promoCode}: ${discountSize}%</div>
            </div>`
        )
    }

    drawStateNoCodeInUse(){
        const totalCostElem = document.querySelector('.summary__total-cost') as HTMLElement;
        totalCostElem.classList.remove('cross-out');
        const summaryAppliedCodesBlock = document.querySelector('.summary__applied-codes') as HTMLElement;
        summaryAppliedCodesBlock.classList.add('hide');
        const newCost = document.querySelector('.summary__new-total-cost') as HTMLElement;
        newCost.classList.add('hide');
    }

    crossOutTotalCost(){
        const totalCostElem = document.querySelector('.summary__total-cost') as HTMLElement;
        totalCostElem.classList.add('cross-out');
    }

    drawNewTotalCost(newTotalCost: number){
        const newCost = document.querySelector('.summary__new-total-cost') as HTMLElement;
        newCost.classList.remove('hide');
        newCost.innerHTML = `Total: $${newTotalCost}`;
    }
}
export default SummaryView;