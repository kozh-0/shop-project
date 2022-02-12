import CartItem from "./CartItem"

export default function CartList(props) {
    const {order = [], handleCartShow = Function.prototype} = props;
    const totalPrice = order.reduce((sum, el) => sum + el.price, 0);

    return (
        <ul className="collection cart-list">
            <li className="collection-item active">Cart
                <span className="secondary-content">
                    <i className="material-icons cart-close" onClick={handleCartShow}>clear</i>
                </span>
            </li>
            {
                order.length ? order.map(item => (
                    <CartItem key={item.id} {...item}/>
                )) : <li className="collection-item">Cart is empty</li>
            }
            <li className="collection-item active center">Total: {totalPrice} $</li>
        </ul>
    )
}