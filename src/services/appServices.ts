import onlineStoreData from "../data/data";
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
    totalCost: 0,
    countTotalQuantity(){
        const quantityObjValues = Object.values(this.quantity);
        this.totalQuantity = quantityObjValues.reduce((acc, value) => acc + value);
    },
    countTotalCost(){
        const productsInCartIndexes = Object.keys(this.quantity);
        this.totalCost = productsInCartIndexes.reduce((acc, key) => { 
            return acc + onlineStoreData[+key].price * this.quantity[+key] 
        }, 0 )
    },
    changeQuantity(productId, quantity){
        if(quantity === 0){
            delete this.quantity[productId];
        } else {
            this.quantity[productId] = quantity;
        }
        this.countTotalCost();
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
    totalCost: number;
    changeQuantity: (productId: string, quantity: number) => void;
    countTotalCost: () => void;
    countTotalQuantity: () => void;
    subscribe: (func: Function) => void;
    notify: () => void;
}