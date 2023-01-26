import { productInfoType } from "../../types";

interface IViewCallbacks {
    drawStartState: (productInfo: productInfoType, index: number, quantity: number) => void;
    drawNewProductQuantity: (productId: string, newQuantityValue: number) => void;
    deleteCard: (productId: string) => void;
    drawTotalCostPerProduct: (productId: string, totalCost: number) => void;
    deleteCurrentCards: () => void;
}

export default IViewCallbacks;