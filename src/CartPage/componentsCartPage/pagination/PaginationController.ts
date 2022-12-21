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
    run(){
        this.paginationView.searchChangedFields();
        this.paginationModel.drawStartPage();
        this.setPaginationButtonsListener();
    }
}
export default PaginationController;