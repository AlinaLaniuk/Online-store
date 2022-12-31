import CardCartModel from "./CardCartModel";
import CardCartView from "./CardCartView";

class CardCartController{
    cardCartModel: CardCartModel;
    cardCartView: CardCartView;

    constructor(){
        this.cardCartView = new CardCartView();
        this.cardCartModel = new CardCartModel(
            {drawStartState: this.cardCartView.drawStartState,
            drawNewProductQuantity: this.cardCartView.drawNewProductQuantity,
            deleteCard: this.cardCartView.deleteCard,
            drawTotalCostPerProduct: this.cardCartView.drawTotalCostPerProduct,
            deleteCurrentCards: this.cardCartView.deleteCurrentCards,
        });  
        this.subscribeToPaginationDataChanging = this.subscribeToPaginationDataChanging.bind(this);
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

    subscribeToPaginationDataChanging(indexes: number[], cardsNumbers: number[]){
        this.cardCartModel.setCurrentIndexes(indexes);
        this.cardCartModel.setCurrentCardsNumbers(cardsNumbers);
        this.cardCartModel.drawCards();
        this.setPlusMinusButtonsListener();
    }

    // run(){
    //     this.cardCartModel.drawCards();
    //     this.setPlusMinusButtonsListener();
    // }
}
export default CardCartController;