import onlineStoreData from "../data/data";
export const productsInCartInfo: productsInCartInfoI = {
    quantity: {

    },
    totalQuantity: 0,
    totalCost: 0,
    countTotalQuantity(){
        const quantityObjValues = Object.values(this.quantity);
        if(quantityObjValues.length === 0){
            this.totalQuantity = 0;
        } else {
            this.totalQuantity = quantityObjValues.reduce((acc, value) => acc + value);
        }
    },
    countTotalCost(){
        const productsInCartIndexes = Object.keys(this.quantity);
        if(productsInCartIndexes.length === 0){
            this.totalCost = 0;
        } else {
            this.totalCost = productsInCartIndexes.reduce((acc, key) => { 
                return acc + onlineStoreData[+key].price * this.quantity[+key] 
            }, 0 )
        }
    },
    countTotalCostWithDiscount(discountSize){
        this.countTotalCost();
        this.totalCost = Math.floor(this.totalCost * (1 - (discountSize / 100)));
    },
    changeQuantity(productId, quantity){
        if(quantity === 0){
            delete this.quantity[productId];
        } else {
            this.quantity[productId] = quantity;
        }
        this.countTotalQuantity();
        this.countTotalCost();
        this.notify();
    },
    subscribers: [],
    subscribe(func){
        this.subscribers.push(func);
    },
    notify(){
        this.subscribers.forEach((func, index) => {
           func();
        })
        this.setLocalStorageInfo();
    },
    getLocalStorageInfo(){
        const localStorageInfo = localStorage.getItem('online-store-info') as string;
        if(localStorageInfo){
            this.quantity = JSON.parse(localStorageInfo) ;
        }
        
    },
    setLocalStorageInfo(){
        localStorage.setItem('online-store-info', JSON.stringify(this.quantity));
    },
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
    countTotalCostWithDiscount: (discountSize: number) => void;
    setLocalStorageInfo: () => void;
    getLocalStorageInfo: () => void;
}
