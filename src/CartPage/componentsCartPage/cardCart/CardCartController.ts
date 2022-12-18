import CardCartModel from "./CardCartModel";
import CardCartView from "./CardCartView";
import { productInfoType, productsInfo } from "../../types";
class CardCartController{
    cardCartModel: CardCartModel;
    cardCartView: CardCartView;
    constructor(){
        this.cardCartView = new CardCartView();
        this.cardCartModel = new CardCartModel(this.cardCartView.drawStartState);  
    }
    run(){
        this.cardCartModel.drawCards();
    }
}
export default CardCartController;