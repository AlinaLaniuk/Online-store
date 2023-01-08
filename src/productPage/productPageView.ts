import { productInfoType } from "../CartPage/types";
class ProductPageView {
  getSmallImagesList(data: productInfoType) {
    const container = document.querySelector(".product__image-container");

    data.images.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "product__image-item";

      const image = document.createElement("img");
      image.className = "product__image-small";
      image.src = item;

      listItem.append(image);
      container?.append(listItem);
    });
  }
  handleAddBtnState(isInCart: boolean): void {
    const addButton = <HTMLButtonElement>document.querySelector('.add-button')
    if (isInCart) {
      addButton.textContent = "Drop from card";
      addButton.classList.add("card_add-button_active");
    } else {
      addButton.textContent = "Add to card";
      addButton.classList.remove("card_add-button_active");
    }
  }
  // this.handleAddBtnState(addBtn, isInCart);
  drawProductPage(data: productInfoType) {
    const mainWrapper = document.querySelector(".main-wrapper") as HTMLElement;
    mainWrapper.innerHTML = "";
    const productPageContainer = document.createElement("div");
    productPageContainer.classList.add("product-page-container");
    mainWrapper.append(productPageContainer);
    // const productPage = document.querySelector('#product-page') as HTMLTemplateElement;
    // const cloneProductPageTemplate = productPage.content.cloneNode(true);
    // productPageContainer.append(cloneProductPageTemplate);
    productPageContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="bread-crumps-container">
            <span>Store</span>
            <span>>></span>
            <span class="bread-crumps__category">${data.category}</span>
            <span>>></span>
            <span class="bread-crumps__brand">${data.brand}</span>
            <span>>></span>
            <span class="bread-crumps__model">${data.title}</span>
          </div>
          <div class="product-container" data-product-id="${data.id}">
            <div class="product-title">${data.title}</div>
            <div class="product-content">
              <ul class="product__image-container">
              </ul>
              <img class="product-main-img" src=${data.thumbnail}>
              <div class="product-info-container">
                <div class="product-info-block description">
                  <div class="title">Description</div>
                  <div class="content">${data.description}</div>
                </div>
                <div class="product-info-block discount">
                  <div class="title">Discount Percentage</div>
                  <div class="content">${data.discountPercentage}</div>
                </div>
                <div class="product-info-block rating">
                  <div class="title">Rating</div>
                  <div class="content">${data.rating}</div>
                </div>
                <div class="product-info-block stock">
                  <div class="title">Stock</div>
                  <div class="content">${data.stock}</div>
                </div>
                <div class="product-info-block brand">
                  <div class="title">Brand</div>
                  <div class="content">${data.brand}</div>
                </div>
                <div class="product-info-block category">
                  <div class="title">Category</div>
                  <div class="content">${data.category}</div>
                </div>
              </div>
              <div class="order-container-product-page">
                <div class="product-cost">$${data.price}</div>
                <button class="add-button">ADD TO CART</button>
                <button class="buy-button">BUY NOW</button>
              </div>
            </div>
          </div>`
    );
  }
}
export default ProductPageView;
