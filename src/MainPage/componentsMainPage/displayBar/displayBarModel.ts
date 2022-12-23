import onlineStoreData from "../../../data/data";
import { sortOptionsList } from "../../utils/constants";

export class DisplayBardModel {
  generateSection: Function;

  constructor(generateSection: Function) {
    this.generateSection = generateSection;
  }

  getDisplayBar(): void {
    this.generateSection(onlineStoreData.length, sortOptionsList);
  }
}
