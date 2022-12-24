import paginationServices from "../paginationServices";
import { productsInCartInfo } from "../../../services/appServices";
class PaginationModel{
    drawCurrentPageNumber: (pageNumber: number) => void;
    paginatedIndexes: number [][];
    constructor(drawCurrentPage: (pageNumber: number) => void){
        this.drawCurrentPageNumber = drawCurrentPage;
        this.paginatedIndexes = [];
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
    }
    
    getCurrentPageIndexesForDrawing(){
        let indexOfCurrentArrayForDrawing = paginationServices.pageNumber - 1;
        if(this.paginatedIndexes[indexOfCurrentArrayForDrawing]){
            paginationServices.setCurrentIndexesForDrawingCards(this.paginatedIndexes[indexOfCurrentArrayForDrawing]);
        } else {
            indexOfCurrentArrayForDrawing = this.paginatedIndexes.length - 1;
            paginationServices.pageNumber = this.paginatedIndexes.length;
            this.drawStartPageNumber();
            paginationServices.setCurrentIndexesForDrawingCards(this.paginatedIndexes[indexOfCurrentArrayForDrawing]);
        }
    }

    passLimitValue(limitInputValue: number){
        let nextProductsQuantity = 0;
        if(typeof limitInputValue === "number"){
            paginationServices.setCurrentLimitValue(limitInputValue);
            this.getPaginatedIndexes();
            this.getCurrentPageIndexesForDrawing();
            // for(let i = (paginationServices.pageNumber - 1); i < this.paginatedIndexes.length; i += 1){
            //     console.log(paginationServices.pageNumber)
            //     nextProductsQuantity += this.paginatedIndexes[paginationServices.pageNumber - 1].length;
            // }
            // console.log(nextProductsQuantity)
            // if(nextProductsQuantity >= limitInputValue){
            //     paginationServices.setCurrentLimitValue(limitInputValue);
            //     this.getPaginatedIndexes();
            //     this.getCurrentPageIndexesForDrawing();
            // } else {
            //     paginationServices.setCurrentLimitValue(productsInCartInfo.quantity.length);
            // }
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