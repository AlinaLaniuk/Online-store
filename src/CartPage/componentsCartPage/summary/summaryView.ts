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
}
export default SummaryView;