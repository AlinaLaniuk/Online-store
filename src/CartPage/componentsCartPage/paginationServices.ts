const paginationServices: PaginationServicesI = {
   pageNumber: 1,
   pageQuantity: 0,
   limit: 3,
   currentIndexesForDrawingCards: [],
   currentCardsNumbers: [],
   subscribers: [],
   increasePageNumber(){
    if(this.pageNumber < this.pageQuantity){
        this.pageNumber += 1;
        this.addPageToQueryString();
    }
    this.notify();
   },
   decreasePageNumber(){
    if(this.pageNumber > 1){
        this.pageNumber -= 1;
        this.addPageToQueryString();
    }
    this.notify();
    },
    setCurrentLimitValue(currentLimitValue){
        this.limit = currentLimitValue;
        this.addLimitsToQueryString();
        this.notify();
    },
    setCurrentCardsNumbers(newCardsNumber){
        this.currentCardsNumbers = newCardsNumber;
    },
    setCurrentIndexesForDrawingCards(indexesArray){
        this.currentIndexesForDrawingCards = indexesArray;
        this.addPageToQueryString();
        this.notify();
    },
    subscribe(func){
        this.subscribers.push(func);
    },
    notify(){
        this.subscribers.forEach((func) => {
            func();
        })
    },
    setValuesFromQueryParams(limit, page){
        if(limit){
            this.limit = +limit;
        }
        if(page){
            this.pageNumber = +page;
        }
    },
    addLimitsToQueryString(){
        const url = new URL(window.location.href);
        url.searchParams.set('limit', `${this.limit}`)
        history.pushState(null, '', url);
    },
    addPageToQueryString(){
        const url = new URL(window.location.href);
        url.searchParams.set('page', `${this.pageNumber}`)
        history.pushState(null, '', url);
    },
    clearQueryParams(){
        const url = new URL(window.location.href);
        const pageParams = url.searchParams.get('page');
        const limitParams = url.searchParams.get('limit');
        if(pageParams){
            url.searchParams.delete('page');
        }
        if(limitParams){
            url.searchParams.delete('limit');
        }
        history.pushState(null, '', url);
    },
    clearPaginationServicesInfo(){
        this.pageNumber = 1;
        this.pageQuantity = 0;
        this.limit = 3;
        this.currentIndexesForDrawingCards.length = 0;
        this.currentCardsNumbers.length = 0;
    }
}
export default paginationServices;
interface PaginationServicesI {
    pageNumber: number;
    pageQuantity: number;
    limit: number;
    currentIndexesForDrawingCards: number[];
    currentCardsNumbers: number[];
    subscribers: Function[];
    increasePageNumber(): void;
    decreasePageNumber(): void;
    setCurrentLimitValue(currentLimitValue: number): void;
    setCurrentIndexesForDrawingCards(indexesArray: number[]): void;
    setCurrentCardsNumbers(newCardsNumbers: number[]): void;
    subscribe(func: Function): void;
    notify(): void;
    setValuesFromQueryParams(limit: string, page: string): void;
    clearPaginationServicesInfo(): void;
    addLimitsToQueryString(): void;
    addPageToQueryString(): void;
    clearQueryParams(): void;
}