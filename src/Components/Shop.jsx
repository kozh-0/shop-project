import React, {useState, useEffect} from "react"
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import {API_KEY, API_URL} from '../config';

export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    const addItem = (str) => {
        const arr = [...order];
        arr.push(str);
        setOrder(arr);
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
                                            addItem={addItem}
                                        /> }
        </main>
    )
}