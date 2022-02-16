import { useContext } from "react";
import { ShopContext } from "../context";

export default function CartItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeCartItem = Function.prototype,
        incrQuantity = Function.prototype,
        decrQuantity = Function.prototype
    } = props;

    const {example} = useContext(ShopContext);
    console.log(example);

    return (
        <li className="collection-item">
            {name}  
            <i className="material-icons cart-quantity" onClick={() => {decrQuantity(id)}}>remove</i>
                x{quantity}
            <i className="material-icons cart-quantity" onClick={() => {incrQuantity(id)}}>add</i>
                 = {price * quantity} ₽
            <span className="secondary-content">
                <i className="material-icons cart-remove-item" onClick={() => removeCartItem(id)}>remove_shopping_cart</i>
            </span>
        </li>
    )
}