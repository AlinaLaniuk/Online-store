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
      this.productPageView.drawProductPage,
      this.productPageView.getSmallImagesList
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
      } else {
        productsInCartInfo.changeQuantity(`${cardId}`, 1);
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

  setGalleryListener(): void {
    const imageList = document.querySelector(".product__image-container");
    imageList?.addEventListener("click", (event: Event): void => {
      const target = <HTMLElement>event.target;
      this.handlmageChange(target);
    });
  }

  handlmageChange(item: HTMLElement): void {
    if (item.className.includes("product__image-small")) {
      const mainPicture = <HTMLImageElement>(
        document.querySelector(".product-main-img")
      );
      const mainPictureSrc = <string>item.getAttribute("src");

      mainPicture.src = mainPictureSrc;
    }
  }

  run(id: number) {
    this.productPageModel.drawCurrentProductPage(id);
    this.setBuyNowButtonListener();
    this.setAAddBtnListener();
    this.setGalleryListener();
  }
}
export default ProductPageController;
