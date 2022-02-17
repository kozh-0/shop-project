import { useContext } from "react";
import { ShopContext } from "../context";

export default function Cart() {
    const {order, handleCartShow = Function.prototype} = useContext(ShopContext);
    const quantity = order.length;

    return (
        <div 
            className="cart blue darken-4 white-text"
            onClick={handleCartShow}
        >
            <i className="material-icons">shopping_cart</i>
            { quantity ? (
                <span>{quantity}</span>
            ) : null}
        </div>
    );
}

