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
    }
    this.notify();
   },
   decreasePageNumber(){
    if(this.pageNumber > 1){
        this.pageNumber -= 1;
    }
    this.notify();
    },
    setCurrentLimitValue(currentLimitValue){
        this.limit = currentLimitValue;
        this.notify();
    },
    setCurrentCardsNumbers(newCardsNumbers){
        this.currentCardsNumbers = newCardsNumbers;
    },
    setCurrentIndexesForDrawingCards(indexesArray){
        this.currentIndexesForDrawingCards = indexesArray;
        this.notify();
    },
    subscribe(func){
        this.subscribers.push(func);
    },
    notify(){
        this.subscribers.forEach((func) => {
            func(this.currentIndexesForDrawingCards, this.currentCardsNumbers);
        })
    },
    setValuesFromQueryParams(limit, page){
        if(limit){
            this.limit = +limit;
        }
        if(page){
            this.pageNumber = +page;
        }
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
}