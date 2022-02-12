import React, {useState, useEffect} from "react"
import {API_KEY, API_URL} from '../config';

import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import CartList from "./CartList";


export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false);

    // Приходит {id, name, price}
    const addToCart = (item) => {
        // Нет = -1; Нашел = индекс элемента
        const itemIndex = order.findIndex(el => el.id === item.id);

        if (itemIndex < 0) {
            const newItem = { ...item, quantity: 1 };
            setOrder( [...order, newItem] );
        } else {
            const newOrder = order.map((el, index) => {
                if (index === itemIndex) {
                    return {
                        ...el,
                        price: (el.price + (el.price / el.quantity)),
                        quantity: el.quantity + 1
                    }
                } else {
                    // Чтоб при повторном добавлении в корзину одной карточки, предыдущие не становились undefined, так как итерируется каждый объект и если он не равен id добавленного, то он затрется, поэтому возвращаем его неизменным
                    return el;
                }
            });
            
            setOrder(newOrder);
        }
    };

    const handleCartShow = () => {
        setCartShow(!isCartShow);
    };

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {'Authorization': API_KEY}
        }).then((response) => response.json())
        .then((data) => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        });
    }, []);

    return (
        <main className="container">
            <Cart 
                quantity={order.length} 
                handleCartShow={handleCartShow}
            />
            { loading ? <Preloader/> : <GoodsList 
                                            goods={goods} 
                                            addToCart={addToCart}
                                        /> 
            }
            { isCartShow && <CartList 
                                order={order} 
                                handleCartShow={handleCartShow}
                            />
            }
        </main>
    )
}