import { productInfoType } from "../../types";

interface viewCallbacksI {
    drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void;
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void;
    deleteCard: (productId: string) => void;
    drawTotalCostPerProduct: (productId: string, totalCost: number) => void;
}

export default viewCallbacksI;