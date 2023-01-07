import ProductPageModel from "./productPageModel";
import ProductPageView from "./productPageView";
class ProductPageController{
    productPageView: ProductPageView;
    productPageModel: ProductPageModel;
    goToOrderForm: () => void
    constructor(goToOrderForm: () => void){
        this.productPageView = new ProductPageView();
        this.productPageModel = new ProductPageModel(this.productPageView.drawProductPage);
        this.run = this.run.bind(this);
        this.goToOrderForm = goToOrderForm;
    }

    setBuyNowButtonListener(){
        const buyNowButton = document.querySelector('.buy-button') as HTMLElement;
        buyNowButton.addEventListener('click', () => {
            this.goToOrderForm();
        })
    }

    run(id: number){
        this.productPageModel.drawCurrentProductPage(id);
        this.setBuyNowButtonListener();
    }
}
export default ProductPageController;