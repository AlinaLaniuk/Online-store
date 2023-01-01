import CartController from "./CartPage/CartController";
import MainController from "./MainPage/MainController";
import { PageIds } from "./constants";
import { productsInCartInfo } from "../src/services/appServices";
class AppController{
    cartPageController: CartController;
    mainController: MainController;
    mainWrapper: HTMLElement;
    cartQuantityContainer: HTMLElement;
    totalCostContainer: HTMLElement;
    private static defaultPageId = 'main';
    private currentPage = '';
    currentPath: string;
    constructor(){
        this.cartPageController = new CartController();
        this.mainController = new MainController();
        this.mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        this.currentPath = '';
        this.cartQuantityContainer = document.querySelector('.cart-quantity') as HTMLElement;
        this.totalCostContainer = document.querySelector('.cart-total') as HTMLElement;
        this.changeCartTotalQuantity = this.changeCartTotalQuantity.bind(this);
        this.changeTotalCost = this.changeTotalCost.bind(this);
    }

    renderPage(pathName: string){
        switch (pathName) {
            case 'main':
              this.mainWrapper.innerHTML = '';
              this.mainController.run();
              break;
      
            case 'cart':
              this.mainWrapper.innerHTML = '';
              this.cartPageController.runCart();
              break;
          }
    }

    changeCartTotalQuantity(){
        this.cartQuantityContainer.innerHTML = `${productsInCartInfo.totalQuantity}`;
    }

    changeTotalCost(){
        this.totalCostContainer.innerHTML = `Cart total: ${productsInCartInfo.totalCost}`;
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
          const hash = window.location.hash.slice(1) as PageIds;
          this.renderPage(hash);
        });
      }

    run(){
        const currentHash = window.location.hash;
        if(currentHash){
            this.mainWrapper.innerHTML = '';
            const hash = window.location.hash.slice(1) as PageIds;
            this.renderPage(hash);
        } else {
            window.location.hash = PageIds.MainPage;
            this.renderPage(PageIds.MainPage);
        }
        this.enableRouteChange();
        productsInCartInfo.subscribe(this.changeCartTotalQuantity);
        productsInCartInfo.subscribe(this.changeTotalCost)
    }
}
export default AppController;
