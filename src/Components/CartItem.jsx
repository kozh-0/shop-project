
export default function CartItem(props) {
    const {
        id,
        name,
        price,
        quantity
    } = props;
    return <li className="collection-item">
        {name} x {quantity} = {price}
        <span className="secondary-content">
            <i className="material-icons cart-remove-item">remove_shopping_cart</i>
        </span>
    </li>
}