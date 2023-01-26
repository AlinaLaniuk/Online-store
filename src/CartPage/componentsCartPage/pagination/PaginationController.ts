import PaginationModel from "./PaginationModel";
import PaginationView from "./PaginationView";
class PaginationController{
    paginationModel: PaginationModel;
    paginationView: PaginationView;
    constructor(){
        this.paginationView = new PaginationView();
        this.paginationModel = new PaginationModel(
            this.paginationView.drawCurrentPage.bind(this.paginationView)
        );
        this.updateCurrentIndexesForCards = this.updateCurrentIndexesForCards.bind(this);
    }

    setPaginationButtonsListener(){
        const leftButton = document.querySelector('.left') as HTMLElement;
        const rightButton = document.querySelector('.right') as HTMLElement;
        leftButton.addEventListener('click', () => {
            this.paginationModel.goToPrevPage();
        })
        rightButton.addEventListener('click', () => {
            this.paginationModel.goToNextPage();
        })
    }

    updateCurrentIndexesForCards(){
        this.paginationModel.getPaginatedIndexes();
        this.paginationModel.getCurrentPageIndexesForDrawing();
    }

    setLimitInputListener(){
        const limitInput = document.querySelector('.products-in-cart__limit__value') as HTMLInputElement;
        limitInput.addEventListener('change', () => {
            const limitInputValue = +limitInput.value;
            this.paginationModel.passLimitValue(limitInputValue);;
        })  
    }

    run(){
        this.paginationView.searchChangedFields();
        this.paginationModel.drawStartPageNumber();
        this.paginationModel.setStartLimitValue();
        this.setPaginationButtonsListener();
        this.setLimitInputListener();
        this.paginationModel.getPaginatedIndexes();
        this.paginationModel.getCurrentPageIndexesForDrawing();
    }
}
export default PaginationController;