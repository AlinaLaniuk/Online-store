import { productsInCartInfo } from "../../../services/appServices";
import promoCodesInfo from "../../../services/promoCodes";

interface IViewCallbacks{
    drawProductsQuantity: (productsQuantity: number) => void,
    drawTotalCostInCart: (totalCost: number) => void,
    drawPromoCodeForAddBlock: (promoCode: string, discountSize: number) => HTMLElement,
    deletePromoCodeBlockForAdd: () => void,
    drawAppliedCodesBlock: (promoCode: string, discountSize: number) => HTMLElement,
    crossOutTotalCost: () => void,
    drawNewTotalCost: (newTotalCost: number) => void,
    drawPromoCodeInfoBlock: (promoCode: string, discountSize: number) => void,
    drawStateNoCodeInUse: () => void,
}
class SummaryModel{
    viewCallbacks: IViewCallbacks;
    promoCodesInUse: string[];
    discountSize: number;
    constructor(viewCallbacks: IViewCallbacks){
        this.viewCallbacks = viewCallbacks;
        this.promoCodesInUse = [];
        this.setCurrentPromoCode = this.setCurrentPromoCode.bind(this);
        this.discountSize = 0;
    }

    drawNewProductsQuantity(){
        this.viewCallbacks.drawProductsQuantity(productsInCartInfo.totalQuantity);
    }

    drawNewTotalCostInCart(){
        this.viewCallbacks.drawTotalCostInCart(productsInCartInfo.totalCost);
    }

    drawNewTotalCostWithDiscount(){
        if(this.promoCodesInUse.length){
            this.viewCallbacks.drawNewTotalCost(productsInCartInfo.totalCostWithDiscount);
        }
    }

    setCurrentPromoCode(event: Event){
        const eventTarget = event.target as HTMLInputElement;
        const inputValue = eventTarget.value;
        const currentPromoCode = promoCodesInfo.promoCodesKeys.filter((promoCode) => {
            if(inputValue === promoCode){
                return true;
            }
            return false;
        });
        if(currentPromoCode.length !== 0 && !this.promoCodesInUse.includes(currentPromoCode[0] as string)){
            return this.showCurrentPromoCodeFieldForAdd(currentPromoCode[0] as string, promoCodesInfo.promoCodes[currentPromoCode[0] as string]);
        } else {
            this.viewCallbacks.deletePromoCodeBlockForAdd();
        }
        if(this.promoCodesInUse.includes(currentPromoCode[0] as string)){
            this.showCurrentPromoCodeInfo(currentPromoCode[0] as string, promoCodesInfo.promoCodes[currentPromoCode[0] as string])
        }
    }
    
    addPromoCode(promoCode: string){
        this.promoCodesInUse.push(promoCode);
        const dropButton = this.viewCallbacks.drawAppliedCodesBlock(promoCode, promoCodesInfo.promoCodes[promoCode]) as HTMLElement;
        this.countDiscountSize();
        productsInCartInfo.setDiscountSize(this.discountSize);
        productsInCartInfo.countTotalCostWithDiscount();
        this.viewCallbacks.crossOutTotalCost();
        this.viewCallbacks.drawNewTotalCost(productsInCartInfo.totalCostWithDiscount);
        return dropButton;
    }

    dropPromoCode(promoCode: string){
        const indexOfPromoCodeForDrop = this.promoCodesInUse.indexOf(promoCode);
        this.promoCodesInUse.splice(indexOfPromoCodeForDrop, 1);
        this.countDiscountSize();
        productsInCartInfo.setDiscountSize(this.discountSize);
        productsInCartInfo.countTotalCostWithDiscount();
        if(this.promoCodesInUse.length === 0){
            this.viewCallbacks.drawStateNoCodeInUse();
        } else {
            this.viewCallbacks.drawNewTotalCost(productsInCartInfo.totalCostWithDiscount);
        }
    }

    countDiscountSize(){
        this.discountSize = this.promoCodesInUse.reduce((acc, value) => {
           return acc + promoCodesInfo.promoCodes[value]
        }, 0)
    }

    showCurrentPromoCodeFieldForAdd(promoCode: string, discountSize: number){
        return this.viewCallbacks.drawPromoCodeForAddBlock(promoCode, discountSize)
    }

    showCurrentPromoCodeInfo(promoCode: string, discountSize: number){
        return this.viewCallbacks.drawPromoCodeInfoBlock(promoCode, discountSize)
    }

    clearPromoCodesInUseArray(){
        this.promoCodesInUse.length = 0;
    }
}
export default SummaryModel;