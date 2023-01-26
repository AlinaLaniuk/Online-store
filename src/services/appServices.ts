import onlineStoreData from "../data/onlineStoreData";
export const productsInCartInfo: productsInCartInfoI = {
    quantity: {

    },
    discountSize: 0,
    totalQuantity: 0,
    totalCost: 0,
    totalCostWithDiscount: 0,
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
        if(this.discountSize !== 0){
            this.countTotalCostWithDiscount();
        }
    },
    setDiscountSize(newDiscountSize){
        this.discountSize = newDiscountSize;
    },
    countTotalCostWithDiscount(){
        this.totalCostWithDiscount = Math.floor(this.totalCost * (1 - (this.discountSize / 100)));
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
    cleanCart(){
        Object.keys(productsInCartInfo.quantity).forEach(key => delete productsInCartInfo.quantity[key]);
        this.countTotalQuantity();
        this.countTotalCost();
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
    discountSize: number;
    totalCostWithDiscount: number;
    changeQuantity: (productId: string, quantity: number) => void;
    countTotalCost: () => void;
    countTotalQuantity: () => void;
    subscribe: (func: Function) => void;
    notify: () => void;
    countTotalCostWithDiscount: () => void;
    setDiscountSize: (newDiscountSize: number) => void;
    setLocalStorageInfo: () => void;
    getLocalStorageInfo: () => void;
    cleanCart: () => void;
}
