export let pageNumber: number = 1;
export let limit: number = 3;

export function setCurrentLimitValue(currentLimit: number){
    limit = currentLimit;
}

export function increasePageNumber(){
    pageNumber += 1;
    console.log(pageNumber);
}

export function decreasePageNumber(){
    if(pageNumber > 0){
        pageNumber -= 1;
    }
    console.log(pageNumber);
}