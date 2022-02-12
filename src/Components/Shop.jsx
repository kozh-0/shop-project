import React, {useState, useEffect} from "react"
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import {API_KEY, API_URL} from '../config';

export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    // Приходит {id, name, price}
    const addToCart = (item) => {
        // Нет = -1; Нашел = индекс элемента
        const itemIndex = order.findIndex(el => el.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((el, index) => {
                if (index === itemIndex) {
                    return {
                        ...el,
                        price: (el.price + (el.price / el.quantity)),
                        quantity: el.quantity + 1
                    }
                } else {
                    return el;
                }
            });
            
            setOrder(newOrder);
        }
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
            <Cart quantity={order.length}/>
            { loading ? <Preloader/> : <GoodsList 
                                            goods={goods} 
                                            addToCart={addToCart}
                                        /> }
        </main>
    )
}