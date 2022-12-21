import { pageNumber, limit, setCurrentLimitValue, increasePageNumber, decreasePageNumber, setPaginatedIndexes } from "../paginationServices";
import { productsQuantityInCart } from "../../../services/appServices";
class PaginationModel{
    drawCurrentPageNumber: (pageNumber: number) => void;
    constructor(drawCurrentPage: (pageNumber: number) => void){
        this.drawCurrentPageNumber = drawCurrentPage;
    }

    getPaginatedIndexes(){
        const allProductsIndexesInCart = Object.keys(productsQuantityInCart);
        const paginatedIndexes = [];
        while(allProductsIndexesInCart.length){
            const indexesForPage: number[] = [];
            for(let i = 0; i < limit; i += 1){
                if(allProductsIndexesInCart.length){
                    indexesForPage.push(+(allProductsIndexesInCart.shift() as string))
                } else {
                    break;
                }
            }
            paginatedIndexes.push(indexesForPage);
        }
        setPaginatedIndexes(paginatedIndexes);
    }

    passLimitValue(){
        const limitInput = document.querySelector('.products-in-cart__limit__value') as HTMLInputElement;
        const limitInputValue = +limitInput.value;
        if(typeof limitInputValue === "number"){
            if(limitInputValue > 0){
                setCurrentLimitValue(limitInputValue);
            } else if(limitInputValue === 0){
                setCurrentLimitValue(productsQuantityInCart.length);
            }
        } 
    }

    setStartLimitValue(){
        const limitInput = document.querySelector('.products-in-cart__limit__value') as HTMLInputElement;
        limitInput.value = `${limit}`;
    }

    drawStartPage(){
        this.drawCurrentPageNumber(pageNumber);
    }

    goToNextPage(){
        increasePageNumber();
        this.drawCurrentPageNumber(pageNumber);
    }

    goToPrevPage(){
        decreasePageNumber();
        this.drawCurrentPageNumber(pageNumber);
    }
}
export default PaginationModel;