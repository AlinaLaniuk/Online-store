import ProductPageModel from "./productPageModel";
import ProductPageView from "./productPageView";
class ProductPageController{
    productPageView: ProductPageView;
    productPageModel: ProductPageModel;
    constructor(){
        this.productPageView = new ProductPageView();
        this.productPageModel = new ProductPageModel(this.productPageView.drawProductPage);
        this.run = this.run.bind(this);
    }

    setBuyNowButtonListener(){
        const buyNowButton = document.querySelector('.buy-button');
    }

    run(id: number){
        this.productPageModel.drawCurrentProductPage(id);
    }
}
export default ProductPageController;