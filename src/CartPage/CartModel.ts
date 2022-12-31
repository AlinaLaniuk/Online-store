class CartModel{
    drawEmptyCartPage: () => void;
    constructor(drawEmptyCartPage: () => void){
        this.drawEmptyCartPage = drawEmptyCartPage;
    }

    setEmptyCartPage(totalCount: number){
        
    }
}
export default CartModel;
