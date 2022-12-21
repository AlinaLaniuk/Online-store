import {MainController} from "./MainPage/MainController";
class AppController{
  mainController: MainController;
    constructor(){
        this.mainController = new MainController();
    }
    run(){
        this.mainController.run();
    }
}
export default AppController;