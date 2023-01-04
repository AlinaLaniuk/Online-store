import CartController from "./CartPage/CartController";
import MainController from "./MainPage/MainController";
import ProductPageController from "./productPage/productPageController";
import { PageIds } from "./constants";
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
        // здесь странички рендеряться в зависимости от того, какой путь указан в поисковой строке
        switch (pathName) {
            case '/':
              this.mainWrapper.innerHTML = '';
              this.mainController.run();
              break;
      
            case '/cart':
              this.getCartParamsFromURL();
              this.mainWrapper.innerHTML = '';
              this.cartPageController.runCart();
              break;

            case `/product-details/${[1-100]}`:
              this.mainWrapper.innerHTML = '';
              this.productPageController.run(10);
              break;
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
        // вот эта функция нужна для разбора query строки.
        const params = window.location.search;
        if(params){
            const paramsObj = new URLSearchParams(params);
            const limitParam = paramsObj.get('limit') as string;
            const pageParam = paramsObj.get('page') as string;
            paginationServices.setValuesFromQueryParams(limitParam, pageParam);          
        }
    }

    private initRouter () {
        // вешается обработчик события на окно на изменение урла
        window.addEventListener('popstate', () => {
            this.renderPage( new URL(window.location.href).pathname);
        });
        // вешаются обработчики клика на элементы, где есть href (это лого, картинка корзины и в корзине сами карточки (обернуты в <a>, пока с ними разбираюсь))
        document.querySelectorAll('[href^="/"]').forEach(el => {
            el.addEventListener('click', (event) => {
                event.preventDefault();
                const {pathname: path} = new URL((event.currentTarget as HTMLAnchorElement).href);
                this.goTo(path);
            })
        })
        // рендер страницы в зависимости от pathname
        this.renderPage(window.location.pathname);
      }

    run(){
        // достает инфу об айдишках товаров из local storage и помещает в appServices
        productsInCartInfo.getLocalStorageInfo(); 
        // считает сумму
        productsInCartInfo.countTotalCost();
        // считает количество товаров в корзине
        productsInCartInfo.countTotalQuantity();
        // меняет в хэдере количество
        this.changeCartTotalQuantity();
        // меняет в хэдере сумму
        this.changeTotalCost();
        // инициализация роутера (смотри что происходит в самой функции)
        this.initRouter();
        // методы, подписывающие сумму и кол-во в хэдере на изменения
        productsInCartInfo.subscribe(this.changeCartTotalQuantity);
        productsInCartInfo.subscribe(this.changeTotalCost);
    }
}
export default AppController;
