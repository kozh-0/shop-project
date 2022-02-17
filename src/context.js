import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isCartShow: false,
    alertName: ''
};


export const ContextProvider = ({children}) => {
    const [value, dispatch] = useReducer(reducer, initialState)

    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'})
    }
    
    value.removeCartItem = (itemId) => {
        dispatch({type: 'REMOVE_CART_ITEM', payload: {id: itemId}})
    }
    
    value.handleCartShow = () => {
        dispatch({type: 'HANDLE_CART_SHOW'})
    }
    
    value.incrQuantity = (itemId) => {
        dispatch({type: 'INCR_QUANTITY', payload: {id: itemId}})
    }
    
    value.decrQuantity = (itemId) => {
        dispatch({type: 'DECR_QUANTITY', payload: {id: itemId}})
    }
    
    value.addToCart = (obj) => {
        dispatch({type: 'ADD_TO_CART', payload: obj})
    }
    
    value.setGoods = (data) => {
        dispatch({type: 'SET_GOODS', payload: data})
    }
    

    return <ShopContext.Provider value={value}>
        ({children})
    </ShopContext.Provider>
}