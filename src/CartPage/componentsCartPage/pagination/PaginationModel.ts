import paginationServices from "../paginationServices";
import { productsInCartInfo } from "../../../services/appServices";
class PaginationModel{
    drawCurrentPageNumber: (pageNumber: number) => void;
    paginatedIndexes: number [][];
    currentNumbersForCards: number[];
    constructor(drawCurrentPage: (pageNumber: number) => void){
        this.drawCurrentPageNumber = drawCurrentPage;
        this.paginatedIndexes = [];
        this.currentNumbersForCards = [];
    }

    getPaginatedIndexes(){
        const allProductsIndexesInCart = Object.keys(productsInCartInfo.quantity);
        const newPaginatedIndexes = [];
        while(allProductsIndexesInCart.length){
            const indexesForPage: number[] = [];
            for(let i = 0; i < paginationServices.limit; i += 1){
                if(allProductsIndexesInCart.length){
                    indexesForPage.push(+(allProductsIndexesInCart.shift() as string))
                } else {
                    break;
                }
            }
            newPaginatedIndexes.push(indexesForPage);
        }
        this.paginatedIndexes = [...newPaginatedIndexes];
        paginationServices.pageQuantity = this.paginatedIndexes.length;
        this.getCurrentCardsNumbers();
    }

    getCurrentCardsNumbers(){
        const firstCardNumberAtCurrentPage = (paginationServices.pageNumber - 1) * paginationServices.limit + 1;
        const currentCardsNumbers = [];
        for(let i = firstCardNumberAtCurrentPage; i < firstCardNumberAtCurrentPage + paginationServices.limit; i += 1){
            currentCardsNumbers.push(i);
        }
        this.currentNumbersForCards = [...currentCardsNumbers];
        paginationServices.setCurrentCardsNumbers(this.currentNumbersForCards);
    }

    getCurrentPageIndexesForDrawing(){
        let indexOfCurrentArrayForDrawing = paginationServices.pageNumber - 1;
        if(this.paginatedIndexes[indexOfCurrentArrayForDrawing]){
            paginationServices.setCurrentIndexesForDrawingCards(this.paginatedIndexes[indexOfCurrentArrayForDrawing]);
        } else {
            indexOfCurrentArrayForDrawing = this.paginatedIndexes.length - 1;
            paginationServices.pageNumber = this.paginatedIndexes.length;
            this.drawStartPageNumber();
            this.getCurrentCardsNumbers();
            paginationServices.setCurrentIndexesForDrawingCards(this.paginatedIndexes[indexOfCurrentArrayForDrawing]);
        }
    }

    passLimitValue(limitInputValue: number){
        if(limitInputValue > 0){
            paginationServices.setCurrentLimitValue(limitInputValue);
            this.getPaginatedIndexes();
            this.getCurrentPageIndexesForDrawing();
        }
    }

    setStartLimitValue(){
        const limitInput = document.querySelector('.products-in-cart__limit__value') as HTMLInputElement;
        limitInput.value = `${paginationServices.limit}`;
    }

    drawStartPageNumber(){
        this.drawCurrentPageNumber(paginationServices.pageNumber);
    }

    goToNextPage(){
        paginationServices.increasePageNumber();
        this.drawCurrentPageNumber(paginationServices.pageNumber);
        this.getPaginatedIndexes();
        this.getCurrentPageIndexesForDrawing();
    }

    goToPrevPage(){
        paginationServices.decreasePageNumber();
        this.drawCurrentPageNumber(paginationServices.pageNumber);
        this.getPaginatedIndexes();
        this.getCurrentPageIndexesForDrawing();
    }
}
export default PaginationModel;