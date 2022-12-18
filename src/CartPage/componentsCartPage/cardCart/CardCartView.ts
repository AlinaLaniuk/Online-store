import { productInfoType, productsInfo } from "../../types";

class CardCartView{
    drawStartState(productInfo: productInfoType, index: number){
        const productsInCartContent = document.querySelector('.products-in-cart__content') as HTMLElement;
        productsInCartContent.insertAdjacentHTML(
            'beforeend',
            `<div class="card" data-id="${productInfo.id}">
            <div class="number">${index + 1}</div>
            <div class="product-info">
              <div class="product-info__img">
                <img src="${productInfo.thumbnail}">
              </div>
              <div class="product-info__text">
                <p class="product-info__title">${productInfo.title}</p>
                <div class="line"></div>
                <p class="product-info__description">${productInfo.description}</p>
                <div class="rating-discount-container">
                  <p class="product-info__rating">Rating: ${productInfo.rating}</p>
                  <p class="product-info__discount">Discount: ${productInfo.discountPercentage}</p>
                </div>
              </div>
            </div>
            <div class="quantity-info">
              <p class="quantity-info__stock">Stock: ${productInfo.stock}</p>
              <div class="quantity-info__quantity-for-order">
                <div class="quantity-info__quantity-for-order__button">+</div>
                <div class="quantity-info__quantity-for-order__value">1</div>
                <div class="quantity-info__quantity-for-order__button">-</div>
              </div>
              <p class="quantity-info__price">$${productInfo.price}</p>
            </div>
          </div>`
        )
    }
}
export default CardCartView;
