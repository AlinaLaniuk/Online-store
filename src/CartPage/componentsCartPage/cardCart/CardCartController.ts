import CardCartModel from "./CardCartModel";
import CardCartView from "./CardCartView";

class CardCartController{
    cardCartModel: CardCartModel;
    cardCartView: CardCartView;
    productPageRun: (id: number) => void;
    constructor(productPageRun: (id: number) => void){
        this.productPageRun = productPageRun
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

    setOpenProductPageListener(){
        const cards = document.querySelectorAll('.product-info');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const cardParent = card.parentNode as HTMLElement;
                const cardID = cardParent.dataset.id as string;
                // this.productPageRun(+cardID)
                window.location.hash = 'product-details';
                window.location.pathname = '10';
            })
        })
    }

    subscribeToPaginationDataChanging(indexes: number[], cardsNumbers: number[]){
        this.cardCartModel.setCurrentIndexes(indexes);
        this.cardCartModel.setCurrentCardsNumbers(cardsNumbers);
        this.cardCartModel.drawCards();
        this.setOpenProductPageListener();
        this.setPlusMinusButtonsListener();
    }

    // run(){
    //     this.cardCartModel.drawCards();
    //     this.setPlusMinusButtonsListener();
    // }
}
export default CardCartController;