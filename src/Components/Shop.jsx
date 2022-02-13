import React, {useState, useEffect} from "react"
import {API_KEY, API_URL} from '../config';

import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import CartList from "./CartList";
import Alert from "./Alert";


export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    // Приходит {id, name, price}
    const addToCart = (obj) => {
        // Нет = -1; Нашел = индекс элемента
        const objIndex = order.findIndex(el => el.id === obj.id);

        if (objIndex < 0) {
            const newItem = {
                ...obj, 
                quantity: 1 
            };
            setOrder( [...order, newItem] );
        } else {
            const newOrder = order.map((el, index) => {
                if (index === objIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1
                    }
                } else {
                    // Чтоб при повторном добавлении в корзину одной карточки, предыдущие не становились undefined, так как итерируется каждый объект и если он не равен id добавленного, то он затрется, поэтому возвращаем его неизменным
                    return el;
                }
            });
            
            setOrder(newOrder);
        }
        setAlertName(obj.name);
    };
    
    const incrQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                return {
                    ...el,
                    quantity: el.quantity + 1
                }
            } else {
                return el;
            }
        })
        setOrder(newOrder)
    };
    const decrQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            } else {
                return el;
            }
        })
        setOrder(newOrder)
    };

    const removeCartItem = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    };

    const handleCartShow = () => setCartShow(!isCartShow);


    const closeAlert = () => {
        setAlertName('');
    }

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
                                removeCartItem={removeCartItem}
                                incrQuantity={incrQuantity}
                                decrQuantity={decrQuantity}
                            />
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    )
}