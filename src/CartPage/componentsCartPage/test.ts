import paginationServices from "./paginationServices";

afterEach(() => {
    paginationServices.clearPaginationServicesInfo();
});

test('Have subscriber been pushed in subscribers-array?', () => {
    function test(){};
    paginationServices.subscribe(test);
    expect(paginationServices.subscribers.at(-1) === test).toBe(true);
});

test('Have page number been decreased?', () => {
    let currentPageNumber = 2;
    paginationServices.pageNumber = currentPageNumber;
    paginationServices.decreasePageNumber();
    expect(paginationServices.pageNumber === (currentPageNumber - 1)).toBe(true);
    const minAccessPageNumber = 1;
    paginationServices.decreasePageNumber();
    expect(paginationServices.pageNumber === minAccessPageNumber).toBe(true);
});

test('Have page number been increased?', () => {
    const currentPageQuantity = 6;
    paginationServices.pageQuantity = currentPageQuantity;
    let currentPageNumber = 5;
    paginationServices.pageNumber = currentPageNumber;
    paginationServices.increasePageNumber();
    expect(paginationServices.pageNumber === (currentPageNumber + 1)).toBe(true);
    paginationServices.increasePageNumber();
    expect(paginationServices.pageNumber === currentPageQuantity).toBe(true);
});