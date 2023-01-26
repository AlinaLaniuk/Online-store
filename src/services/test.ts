import { productsInCartInfo } from "./appServices";

afterEach(() => {

    for (let prop in productsInCartInfo.quantity){
        delete productsInCartInfo.quantity[prop];
    }

    productsInCartInfo.discountSize = 0;
    productsInCartInfo.totalQuantity = 0;
    productsInCartInfo.totalCost = 0;
    productsInCartInfo.totalCostWithDiscount = 0;
});

test('Is total counter work correct?', () => {
    productsInCartInfo.countTotalQuantity();
    expect(productsInCartInfo.totalQuantity === 0).toBe(true);
    productsInCartInfo.changeQuantity('1', 1);
    productsInCartInfo.countTotalQuantity();
    expect(productsInCartInfo.totalQuantity === 1).toBe(true);
});

test('Is cart clean now?', () => {
    productsInCartInfo.changeQuantity('1', 1);
    productsInCartInfo.changeQuantity('2', 1);
    productsInCartInfo.changeQuantity('3', 1);
    productsInCartInfo.cleanCart();
    expect(Object.keys(productsInCartInfo.quantity).length === 0).toBe(true);
    expect(productsInCartInfo.totalCost === 0).toBe(true);
    expect(productsInCartInfo.totalQuantity === 0).toBe(true);
});

test('Have all subscribers been called?', () => {
    const testFunc1 = jest.fn();
    const testFunc2 = jest.fn();
    productsInCartInfo.subscribe(testFunc1);
    productsInCartInfo.subscribe(testFunc2);
    productsInCartInfo.notify();
    expect(testFunc1).toHaveBeenCalled();
    expect(testFunc2).toHaveBeenCalled();
});


