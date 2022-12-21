import { pageNumber, limit, setCurrentLimitValue, increasePageNumber, decreasePageNumber } from "../paginationServices";
import { productsQuantityInCart } from "../../../services/appServices";
class PaginationModel{
    drawCurrentPage: (pageNumber: number) => void;
    constructor(drawCurrentPage: (pageNumber: number) => void){
        this.drawCurrentPage = drawCurrentPage;
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

    drawStartPage(){
        this.drawCurrentPage(pageNumber);
    }

    goToNextPage(){
        increasePageNumber();
        this.drawCurrentPage(pageNumber);
    }

    goToPrevPage(){
        decreasePageNumber();
        this.drawCurrentPage(pageNumber);
    }
}
export default PaginationModel;