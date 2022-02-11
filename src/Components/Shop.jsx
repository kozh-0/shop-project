import React, {useState, useEffect} from "react"
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import {API_KEY, API_URL} from '../config';

export default function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        });
    }, []);

    return (
        <main className="content container">
            {
                loading ? <Preloader/> : <GoodsList goods={goods}/>
            }
        </main>
    )
}