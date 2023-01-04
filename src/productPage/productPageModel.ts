import onlineStoreData from "../data/data";
import { productInfoType } from "../CartPage/types"
class ProductPageModel{
    drawProductPage: (data: productInfoType) => void
    constructor(drawProductPage: (data: productInfoType) => void){
        this.drawProductPage = drawProductPage
    }

    drawCurrentProductPage(id: number){
        this.drawProductPage(onlineStoreData[id])
    }
}
export default ProductPageModel;