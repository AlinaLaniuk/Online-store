import SummaryModel from "./summaryModel";
import SummaryView from "./summaryView";
import { productsInCartInfo } from "../../../services/appServices";
class SummaryController{
    summaryModel: SummaryModel;
    summaryView: SummaryView;
    constructor(){
        this.summaryView = new SummaryView();
        this.summaryModel = new SummaryModel(this.summaryView.drawProductsQuantity);
        this.subscribeToTotalQuantityChanging = this.subscribeToTotalQuantityChanging.bind(this);
    }

    subscribeToTotalQuantityChanging(){
        this.summaryModel.drawNewProductsQuantity();
    }

    run(){
        this.summaryView.drawStartSummaryState();
        productsInCartInfo.countTotalQuantity();
        this.summaryModel.drawNewProductsQuantity();
    }
}
export default SummaryController;