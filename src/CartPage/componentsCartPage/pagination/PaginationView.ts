class PaginationView{
    pageNumberContainer: HTMLElement;
    constructor(){
        this.pageNumberContainer = document.createElement('div');
    }
    searchChangedFields(){
        this.pageNumberContainer = document.querySelector('.products-in-cart__pagination__value') as HTMLElement;
    }
    drawCurrentPage(pageNumber: number){
        this.pageNumberContainer.innerHTML = `${pageNumber}`;
    }
}
export default PaginationView;