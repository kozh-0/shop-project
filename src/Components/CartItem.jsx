
export default function CartItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeCartItem = Function.prototype
    } = props;
    return (
        <li className="collection-item">
            {name} x 
            <i className="material-icons cart-quantity">remove</i>
                {quantity}
            <i className="material-icons cart-quantity">add</i>
                 = {price} ₽
            <span className="secondary-content">
                <i className="material-icons cart-remove-item" onClick={() => removeCartItem(id)}>remove_shopping_cart</i>
            </span>
        </li>
    )
}