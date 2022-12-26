import { productsInCartInfo } from "../../../services/appServices";
import promoCodesInfo from "../../../services/promoCodes";

type promoCodesI = ['qwerty'?, '11111'?, 'hello world'?, '12345'?, 'password'?];
class SummaryModel{
    drawProductsQuantity: (productsQuantity: number) => void;
    drawTotalCostInCart: (totalCost: number) => void;
    drawPromoCodeForAddBlock: (promoCode: string, discountSize: number) => HTMLElement;
    promoCodesInUse: string[];
    promoCodeForAdd: string[];
    constructor(drawProductsQuantity: (productsQuantity: number) => void,
    drawTotalCostInCart: (totalCost: number) => void,
    drawPromoCodeForAddBlock: (promoCode: string, discountSize: number) => HTMLElement
    ){
        this.drawProductsQuantity = drawProductsQuantity;
        this.drawTotalCostInCart = drawTotalCostInCart;
        this.drawPromoCodeForAddBlock = drawPromoCodeForAddBlock;
        this.promoCodesInUse = [];
        this.promoCodeForAdd = [];
        this.setCurrentPromoCode = this.setCurrentPromoCode.bind(this);
    }

    drawNewProductsQuantity(){
        this.drawProductsQuantity(productsInCartInfo.totalQuantity);
    }

    drawNewTotalCostInCart(){
        this.drawTotalCostInCart(productsInCartInfo.totalCost);
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
        if(currentPromoCode.length !== 0 && !(this.promoCodeForAdd.includes(currentPromoCode[0] as string))){
            this.promoCodeForAdd.push(currentPromoCode[0] as string);
            return this.showCurrentPromoCodeField(currentPromoCode[0] as string, promoCodesInfo.promoCodes[currentPromoCode[0] as string]);
        }
    }

    showCurrentPromoCodeField(promoCode: string, discountSize: number){
        return this.drawPromoCodeForAddBlock(promoCode, discountSize)
    }
}
export default SummaryModel;