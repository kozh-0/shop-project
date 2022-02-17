import { useContext } from "react";
import { ShopContext } from "../context";
import CartItem from "./CartItem"

export default function CartList() {
    const {
        order = [], 
        handleCartShow = Function.prototype, 
    } = useContext(ShopContext)

    const totalPrice = order.reduce((sum, el) => sum + el.price * el.quantity, 0);

    return (
        <ul className="collection cart-list">
            <li className="collection-item active">Cart
                <span className="secondary-content">
                    <i className="material-icons cart-close" onClick={handleCartShow}>clear</i>
                </span>
            </li>
            {
                order.length ? order.map(item => (
                    <CartItem 
                        key={item.id} 
                        {...item} 
                    />
                )) : <li className="collection-item">Cart is empty</li>
            }
            <li className="collection-item active center checkout-and-total">
                <span className="left">Total: {totalPrice} ₽</span>
                <button 
                    className="secondary-content btn-small #ffffff black"
                    onClick={() => console.log('No back-end')}
                >Checkout</button>
            </li>
        </ul>
    )
}