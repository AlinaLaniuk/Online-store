export const productsInCartInfo: productsInCartInfoI = {
  quantity: {},
  changeQuantity(productId, quantity) {
    if (quantity === 0) {
      delete this.quantity[productId];
    } else {
      this.quantity[productId] = quantity;
    }
    this.notify();
  },
  subscribers: [],
  subscribe(func) {
    this.subscribers.push(func);
  },
  notify() {
    this.subscribers.forEach((func: Function) => {
      func();
    });
  },
};
interface productsInCartInfoI {
  quantity: { [key: string]: number };
  subscribers: Function[];
  changeQuantity: (productId: string, quantity: number) => void;
  subscribe: (func: Function) => void;
  notify: () => void;
}
export let totalCost: number = 0;
