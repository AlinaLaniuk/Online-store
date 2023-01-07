import { productInfoType, productsInfo } from "../../types";

class CardCartView{
    drawStartState(productInfo: productInfoType, index: number, quantity: number){
        const productsInCartContent = document.querySelector('.products-in-cart__content') as HTMLElement;
        productsInCartContent.insertAdjacentHTML(
            'beforeend',
            `<div class="cart-card" data-id="${productInfo.id}">
            <div class="number">${index}</div>
            <a class="product-info" href="/product-details-${productInfo.id}">
              <div class="product-info__img">
                <img src="${productInfo.thumbnail}">
              </div>
              <div class="product-info__text">
                <p class="product-info__title">${productInfo.title}</p>
                <div class="line"></div>
                <p class="product-info__description">${productInfo.description}</p>
                <div class="rating-discount-container">
                  <p class="product-info__rating">Rating: ${productInfo.rating}</p>
                  <p class="product-info__discount">Discount: ${productInfo.discountPercentage}%</p>
                </div>
              </div>
            </a>
            <div class="quantity-info" data-id="${productInfo.id}">
              <p class="quantity-info__stock">Stock: ${productInfo.stock}</p>
              <div class="quantity-info__quantity-for-order">
                <div class="quantity-info__quantity-for-order__button plus">+</div>
                <div class="quantity-info__quantity-for-order__value">${quantity}</div>
                <div class="quantity-info__quantity-for-order__button minus">-</div>
              </div>
              <p class="quantity-info__price">$</p>
            </div>
          </div>`
        )
    }

    drawNewProductQuantity(productId: string, newQuantityValue: number){
      const quantityInfoBlock = document.querySelector(`.quantity-info[data-id="${productId}"]`) as HTMLElement;
      const quantityForOrderElement = quantityInfoBlock.querySelector('.quantity-info__quantity-for-order__value') as HTMLElement;
      quantityForOrderElement.innerHTML = `${newQuantityValue}`;
    }

    deleteCard(productId: string){
      const cardContainer = document.querySelector(`.products-in-cart__content`) as HTMLElement;
      const card =  cardContainer.querySelector(`.card[data-id="${productId}"]`) as Node;
      cardContainer.removeChild(card);
    }

    deleteCurrentCards(){
      const cardContainer = document.querySelector(`.products-in-cart__content`) as HTMLElement;
      cardContainer.innerHTML = '';
    }

    drawTotalCostPerProduct(productId: string, totalCost: number){
      const quantityInfoBlock = document.querySelector(`.quantity-info[data-id="${productId}"]`) as HTMLElement;
      const priceBlock = quantityInfoBlock.querySelector(`.quantity-info__price`) as HTMLElement;
      priceBlock.innerHTML = `$${totalCost}`;
    }
}
export default CardCartView;
