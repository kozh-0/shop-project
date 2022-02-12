import GoodsItem from "./GoodsItem";

export default function GoodsList(props) {
    const {goods = [], addToCart = Function.prototype} = props;

    if (!goods.length) {
        return <h3>Nothing found</h3>
    }
    return (
        <div className="content">
            {goods.map(item => (
                <GoodsItem key={item.id} {...item} addToCart={addToCart}/>
            ))}
        </div>
    )      
}