import CartController from "./CartPage/CartController";
import MainController from "./MainPage/MainController";
import ProductPageController from "../src/productPage/productPageController";
import { productsInCartInfo } from "../src/services/appServices";
import paginationServices from "./CartPage/componentsCartPage/paginationServices";

class AppController{
    cartPageController: CartController;
    mainController: MainController;
    productPageController: ProductPageController;
    mainWrapper: HTMLElement;
    cartQuantityContainer: HTMLElement;
    totalCostContainer: HTMLElement;
    private static defaultPageId = 'main';
    private currentPage = '';
    currentPath: string;
    constructor(){
        this.productPageController = new ProductPageController();
        this.cartPageController = new CartController(this.productPageController.run);
        this.mainController = new MainController();
        this.mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        this.currentPath = '';
        this.cartQuantityContainer = document.querySelector('.cart-quantity') as HTMLElement;
        this.totalCostContainer = document.querySelector('.cart-total') as HTMLElement;
        this.changeCartTotalQuantity = this.changeCartTotalQuantity.bind(this);
        this.changeTotalCost = this.changeTotalCost.bind(this);
    }

    renderPage(pathName: string){
        if(pathName === '/'){
            this.mainWrapper.innerHTML = '';
            this.mainController.run();
            productsInCartInfo.subscribers.length = 0;
            paginationServices.subscribers.length = 0;
            productsInCartInfo.subscribe(this.changeCartTotalQuantity);
            productsInCartInfo.subscribe(this.changeTotalCost);
        } else if(pathName === '/cart'){
            productsInCartInfo.subscribers.length = 0;
            paginationServices.subscribers.length = 0;
            productsInCartInfo.subscribe(this.changeCartTotalQuantity);
            productsInCartInfo.subscribe(this.changeTotalCost);
            this.getCartParamsFromURL();
            this.mainWrapper.innerHTML = '';
            this.cartPageController.runCart();
            const cartCardsContainer = document.querySelector('.products-in-cart__content') as HTMLElement;
            this.addElementsWithHrefListener(cartCardsContainer);
        } else if(pathName.startsWith('/product-details-')){
            const productId = pathName.slice(17);
            this.mainWrapper.innerHTML = '';
            this.productPageController.run(+productId);
        }            
    }

    goTo = (path: string) => {
        window.history.pushState({path}, path, path)
        this.renderPage(path)
    }

    changeCartTotalQuantity(){
        this.cartQuantityContainer.innerHTML = `${productsInCartInfo.totalQuantity}`;
    }

    changeTotalCost(){
        this.totalCostContainer.innerHTML = `Cart total: $${productsInCartInfo.totalCost}`;
    }
    
    getCartParamsFromURL(){
        const params = window.location.search;
        if(params){
            const paramsObj = new URLSearchParams(params);
            const limitParam = paramsObj.get('limit') as string;
            const pageParam = paramsObj.get('page') as string;
            paginationServices.setValuesFromQueryParams(limitParam, pageParam);          
        }
    }

    private initRouter () {
        window.addEventListener('popstate', () => {
            this.renderPage( new URL(window.location.href).pathname);
        });        
      }

    addElementsWithHrefListener(container: HTMLElement){
        container.querySelectorAll('[href^="/"]').forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                const {pathname: path} = new URL((event.currentTarget as HTMLAnchorElement).href);
                this.goTo(path);
            })
        })
    }

    run(){
        productsInCartInfo.getLocalStorageInfo(); 
        productsInCartInfo.countTotalCost();
        productsInCartInfo.countTotalQuantity();
        productsInCartInfo.subscribe(this.changeCartTotalQuantity);
        productsInCartInfo.subscribe(this.changeTotalCost);
        this.changeCartTotalQuantity();
        this.changeTotalCost();
        this.initRouter();
        this.renderPage(window.location.pathname);
        const header = document.querySelector('.header-wrapper') as HTMLElement;
        this.addElementsWithHrefListener(header);
    }
}
export default AppController;
