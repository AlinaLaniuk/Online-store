import CardCartModel from "./CardCartModel";
import CardCartView from "./CardCartView";
import { productInfoType, productsInfo } from "../../types";
class CardCartController{
    cardCartModel: CardCartModel;
    cardCartView: CardCartView;

    constructor(){
        this.cardCartView = new CardCartView();
        this.cardCartModel = new CardCartModel(
            this.cardCartView.drawStartState,
            this.cardCartView.drawNewProductQuantity,
            this.cardCartView.deleteCard,
            );  
    }

    setPlusMinusButtonsListener(){
        const quantityForOrderBlocksCollection = document.querySelectorAll('.quantity-info__quantity-for-order');
        quantityForOrderBlocksCollection.forEach((quantityForOrderBlock) => {
            const productIdStr = `${(quantityForOrderBlock as HTMLElement).dataset.id}`;
            const plusButton = quantityForOrderBlock.querySelector('.plus') as HTMLElement;
            const minusButton = quantityForOrderBlock.querySelector('.minus') as HTMLElement;
            plusButton.addEventListener('click', () => {
                this.cardCartModel.increaseProductQuantity(productIdStr);
            })
            minusButton.addEventListener('click', () => {
                this.cardCartModel.decreaseProductQuantity(productIdStr);
            })
        })
    }

    run(){
        this.cardCartModel.drawCards();
        this.setPlusMinusButtonsListener();
    }
}
export default CardCartController;