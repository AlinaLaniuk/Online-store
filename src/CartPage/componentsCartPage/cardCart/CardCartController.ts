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
            this.cardCartView.drawTotalCostPerProduct,
            );  
    }

    setPlusMinusButtonsListener(){
        const quantityInfoBlocksCollection = document.querySelectorAll('.quantity-info');
        quantityInfoBlocksCollection.forEach((quantityInfoBlock) => {
            const productIdStr = `${(quantityInfoBlock as HTMLElement).dataset.id}`;
            const plusButton = quantityInfoBlock.querySelector('.plus') as HTMLElement;
            const minusButton = quantityInfoBlock.querySelector('.minus') as HTMLElement;
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