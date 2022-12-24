import SummaryModel from "./summaryModel";
import SummaryView from "./summaryView";
class SummaryController{
    summaryModel: SummaryModel;
    summaryView: SummaryView;
    constructor(){
        this.summaryModel = new SummaryModel();
        this.summaryView = new SummaryView();
    }
    run(){
        this.summaryView.drawStartSummaryState();
    }
}
export default SummaryController;