import { useContext } from "react";
import { ShopContext } from "../context";
import GoodsItem from "./GoodsItem";

export default function GoodsList() {
    const { goods = [] } = useContext(ShopContext);

    if (!goods.length) {
        return <h3>Nothing found</h3>
    }
    
    return (
        <div className="content">
            {goods.map(item => (
                <GoodsItem key={item.id} {...item}/>
            ))}
        </div>
    )      
}