export const productsInCartInfo: productsInCartInfoI = {
    quantity: {
        '0': 3,
        '3': 4,
        '5': 2,
        '6': 1,
        '7': 4,
        '8': 3,
        '9': 4,
        '15': 2,
        '45': 1,
        '67': 4,
    },
    totalQuantity: 0,
    countTotalQuantity(){
        const quantityObjValues = Object.values(this.quantity);
        this.totalQuantity = quantityObjValues.reduce((acc, value) => acc + value);
    },
    changeQuantity(productId, quantity){
        if(quantity === 0){
            delete this.quantity[productId];
        } else {
            this.quantity[productId] = quantity;
        }
        this.countTotalQuantity();
        this.notify();
    },
    subscribers: [],
    subscribe(func){
        this.subscribers.push(func);
    },
    notify(){
        this.subscribers.forEach((func) => {
            func();
        })
    }


}
interface productsInCartInfoI {
    quantity: { [key: string]: number };
    subscribers: Function[];
    totalQuantity:number;
    changeQuantity: (productId: string, quantity: number) => void;
    countTotalQuantity: () => void;
    subscribe: (func: Function) => void;
    notify: () => void;
}
export let totalCost: number = 0;