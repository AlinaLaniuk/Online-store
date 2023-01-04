import SummaryModel from "./summaryModel";
import SummaryView from "./summaryView";
import { productsInCartInfo } from "../../../services/appServices";
class SummaryController{
    summaryModel: SummaryModel;
    summaryView: SummaryView;
    constructor(){
        this.summaryView = new SummaryView();
        this.summaryModel = new SummaryModel({
            drawProductsQuantity: this.summaryView.drawProductsQuantity,
            drawTotalCostInCart: this.summaryView.drawTotalCostInCart,
            drawPromoCodeForAddBlock: this.summaryView.drawPromoCodeForAddBlock,
            deletePromoCodeBlockForAdd: this.summaryView.deletePromoCodeBlockForAdd,
            drawAppliedCodesBlock: this.summaryView.drawAppliedCodesBlock,
            crossOutTotalCost: this.summaryView.crossOutTotalCost,
            drawNewTotalCost: this.summaryView.drawNewTotalCost,
            drawPromoCodeInfoBlock: this.summaryView.drawPromoCodeInfoBlock,
            drawStateNoCodeInUse: this.summaryView.drawStateNoCodeInUse,
        });
        this.subscribeToTotalQuantityChanging = this.subscribeToTotalQuantityChanging.bind(this);
        this.setAddButtonListener = this.setAddButtonListener.bind(this);
        this.setDropButtonListener = this.setDropButtonListener.bind(this);
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
                const promo = addButtonElem.dataset.id as string; 
                const dropButton = this.summaryModel.addPromoCode(promo);
                dropButton.addEventListener('click', this.setDropButtonListener)
                const addButtonParent = addButtonElem.parentNode as HTMLElement;
                addButtonParent.parentNode?.removeChild(addButtonParent);
            })
        }
    }

    setDropButtonListener(event: Event){
        const eventTarget = event.target as HTMLElement;
        const promoCode = eventTarget.dataset.id as string;
        this.summaryModel.dropPromoCode(promoCode);
        const dropButtonParent = eventTarget.parentNode as HTMLElement;
        const appliedCodesContainer = dropButtonParent.parentNode as HTMLElement;
        appliedCodesContainer.removeChild(dropButtonParent);
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