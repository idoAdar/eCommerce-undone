import * as actionType from '../actionType';

export const newOrder = (item, singlePrice) => (dispatch, getState) => {
    dispatch({
        type: actionType.ADD_TO_CART,
        data: item,
        singlePrice: singlePrice
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
}

export const updateOrder = id => (dispatch, getState) => {
    const cart = getState().cartReducer.cartItems;
    const updateCart = cart.filter(item => item.productId !== id);
    dispatch({
        type: actionType.DELETE_FROM_CART,
        data: updateCart
    })
    localStorage.setItem('cartItems', JSON.stringify(updateCart));
}

export const shippingOrder = (formData, history) => dispatch => {
    const { address, city, country, postalCode } = formData;
    const data = {address, city, country, postalCode}
    dispatch({
        type: actionType.SHIPPING_ADDRESS,
        data: data
    })
    history.push('/payment');
}

export const paymentMethod = (method, history) => dispatch => {
    dispatch({
        type: actionType.PAYMENT_METHOD,
        data: method
    })
    history.push('/place_order');
} 