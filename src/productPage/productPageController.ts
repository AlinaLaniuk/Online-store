import { productsInCartInfo } from "../services/appServices";
import ProductPageModel from "./productPageModel";
import ProductPageView from "./productPageView";
class ProductPageController {
  productPageView: ProductPageView;
  productPageModel: ProductPageModel;
  goToOrderForm: () => void;
  constructor(goToOrderForm: () => void) {
    this.productPageView = new ProductPageView();
    this.productPageModel = new ProductPageModel(
      this.productPageView.drawProductPage
    );
    this.run = this.run.bind(this);
    this.goToOrderForm = goToOrderForm;
  }

  setBuyNowButtonListener() {
    const buyNowButton = document.querySelector(".buy-button") as HTMLElement;
    buyNowButton.addEventListener("click", () => {
      this.goToOrderForm();
    });
  }

  setAAddBtnListener(): void {
    const buyNowButton = <HTMLElement>document.querySelector(".add-button");
    buyNowButton.addEventListener("click", () => {
      const cardId = (<HTMLElement>document.querySelector(".product-container"))
        .getAttribute("data-product-id")!
        .toString();
      const isInCart = !!productsInCartInfo.quantity[cardId];

      if (isInCart) {
        productsInCartInfo.changeQuantity(`${cardId}`, 0);
        console.log('drop')
      } else {
        productsInCartInfo.changeQuantity(`${cardId}`, 1);
        console.log('add')
      }
      this.handleAddBtnState(buyNowButton, !isInCart);
    });
  }

  handleAddBtnState(button: HTMLElement, isInCart: boolean): void {
    if (isInCart) {
      button.textContent = "Drop from card";
      button.classList.add("add-button_active");
    } else {
      button.textContent = "Add to card";
      button.classList.remove("add-button_active");
    }
  }

  run(id: number) {
    this.productPageModel.drawCurrentProductPage(id);
    this.setBuyNowButtonListener();
    this.setAAddBtnListener();
  }
}
export default ProductPageController;
