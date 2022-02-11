import GoodsItem from "./GoodsItem";

export default function GoodsList(props) {
    const {goods = []} = props;

    if (!goods.length) {
        return <h3>Nothing found</h3>
    }
    return (
        <>
            {goods.map(item => (
                <GoodsItem key={item.id} {...item}/>
            ))}
        </>
    )      
}