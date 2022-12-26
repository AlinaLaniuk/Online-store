import SummaryModel from "./summaryModel";
import SummaryView from "./summaryView";
import { productsInCartInfo } from "../../../services/appServices";
class SummaryController{
    summaryModel: SummaryModel;
    summaryView: SummaryView;
    constructor(){
        this.summaryView = new SummaryView();
        this.summaryModel = new SummaryModel(this.summaryView.drawProductsQuantity, this.summaryView.drawTotalCostInCart, this.summaryView.drawPromoCodeForAddBlock);
        this.subscribeToTotalQuantityChanging = this.subscribeToTotalQuantityChanging.bind(this);
        this.setAddButtonListener = this.setAddButtonListener.bind(this);
    }

    subscribeToTotalQuantityChanging(){
        this.summaryModel.drawNewProductsQuantity();
        this.summaryModel.drawNewTotalCostInCart();
    }

    setPromoInputListener(){
        const promoInputContainer = document.querySelector('.summary__promo-input') as HTMLInputElement;
        promoInputContainer.addEventListener('keyup', this.setCurrentPromoCodeDebounced)
    }

    setCurrentPromoCodeDebounced = this.debounce(this.setAddButtonListener, 500)

    debounce(func: Function, ms: number){
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: Event[]) =>{
            const funcCall = () => { func.apply(this, args) };
            clearTimeout(timeout);
            timeout = setTimeout(funcCall, ms);
            funcCall;
        }

    }

    async setAddButtonListener(event: Event){
        const addButtonElem: HTMLElement = await new Promise((resolve, reject) => {
            const addButton = this.summaryModel.setCurrentPromoCode(event) as HTMLElement;
            resolve(addButton);
        });
        if(addButtonElem){
            addButtonElem.addEventListener('click', () => {
                console.log('ccc')
            })
        }
    }

    run(){
        this.summaryView.drawStartSummaryState();
        productsInCartInfo.countTotalQuantity();
        this.summaryModel.drawNewProductsQuantity();
        productsInCartInfo.countTotalCost();
        this.summaryModel.drawNewTotalCostInCart();
        this.setPromoInputListener();
    }
}
export default SummaryController;