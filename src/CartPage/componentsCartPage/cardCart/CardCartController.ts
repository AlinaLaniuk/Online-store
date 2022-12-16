import CardCartModel from "./CardCartModel";
import CardCartView from "./CardCartView";
class CardCartController{
    cardCartModel: CardCartModel;
    cardCartView: CardCartView;
    constructor(){
        this.cardCartModel = new CardCartModel(); 
        this.cardCartView = new CardCartView(); 
    }

}
export default CardCartController;