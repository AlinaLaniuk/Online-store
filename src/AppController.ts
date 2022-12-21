import {MainController} from "./MainPage/MainController";
class AppController{
  mainController: MainController;
    constructor(){
        this.mainController = new MainController();
    }
    run(){
        this.mainController.drawMain();
    }
}
export default AppController;