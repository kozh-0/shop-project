export default function reducer(state, {type, payload}) {
    switch (type) {
        case 'SET_GOODS': 
            return {
                ...state,
                goods: payload || [],
                loading: false
            }
        case 'ADD_TO_CART': {
            const objIndex = state.order.findIndex(el => el.id === payload.id);
            let newOrder = null;

            if (objIndex < 0) {
                const newItem = {
                    ...payload, 
                    quantity: 1 
                };
                newOrder = [...state.order, newItem];
            } else {
                newOrder = state.order.map((el, index) => {
                    if (index === objIndex) {
                        return {
                            ...el,
                            quantity: el.quantity + 1
                        }
                    } else return el;
                });
            }
            return {
                ...state,
                order: newOrder,
                alertName: payload.name
            }
        }
        case 'INCR_QUANTITY':
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload.id) {
                        return {
                            ...el,
                            quantity: el.quantity + 1
                        }
                    } else {
                        return el;
                    }
                })
            }
        case 'DECR_QUANTITY':
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload.id) {
                        const newQuantity = el.quantity - 1;
                        return {
                            ...el,
                            quantity: newQuantity >= 0 ? newQuantity : 0
                        }
                    } else {
                        return el;
                    }
                })
            }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }
        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                order: state.order.filter(el => el.id !== payload.id)
            }
        case 'HANDLE_CART_SHOW':
            return {
                ...state,
                isCartShow: !state.isCartShow
            }
        default:
            return state;
    }
}