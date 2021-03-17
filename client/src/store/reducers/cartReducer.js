import * as actionType from '../actionType';

const initState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: {
        address: null,
        city: null,
        country: null,
        postalCode: null
    },
    paymentMethod: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const newItem = action.data;
            const singlePrice = action.singlePrice;

            const existItem = state.cartItems.find(item => item.productId === newItem.productId);
            const existItemIndex = state.cartItems.findIndex(item => item.productId === newItem.productId);

            if (existItem) {
                existItem.quantity = existItem.quantity + newItem.quantity;
                existItem.price = existItem.quantity * singlePrice;
                const updateCart = [...state.cartItems];
                updateCart[existItemIndex] = existItem;
                return {
                    ...state,
                    cartItems: updateCart
                }
            } else {
                return {
                    ...state,
                    cartItems: [newItem, ...state.cartItems]
                }
            }
        case actionType.DELETE_FROM_CART:
            return {
                ...state,
                cartItems: action.data
            }
        case actionType.SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.data
            }
        case actionType.PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.data
            }
        default: return state;
    }
}
 
export default reducer;