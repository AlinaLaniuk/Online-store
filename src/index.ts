import '../src/styles/main.scss';
import { MainController } from './MainPage/MainController';

const card = new MainController();
const page = <HTMLElement>document.querySelector('.page')
page.append(card.drawMain());