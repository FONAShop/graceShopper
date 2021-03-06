import axios from 'axios';

//ACTION TYPES
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const MINUS_FROM_CART = 'MINUS_FROM_CART';
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';

//INITIAL STATE
const initialState = {};

//ACTION CREATORS
export function getCart (cart) {
  return {
    type: GET_CART,
    cart
  }
}

export function addToCart (product) {
  return {
    type: ADD_TO_CART,
    product
  }
}

export function minusOneFromCart (product) {
  return {
    type: MINUS_FROM_CART,
    product
  }
}

export function deleteProdFromCart (cart) {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    cart
  }
}

//THUNK CREATORS
export function fetchCart () {
  return function thunk (dispatch) {
    return axios.get('/api/cart')
      .then(res => res.data)
      .then(cart => {
        dispatch(getCart(cart))
      })
      .catch(err => console.error(`Fetch cart unsuccessful`, err));
  }
}

export function addProductToCart (productId) {
  return function thunk (dispatch) {
    return axios.put('/api/cart/add', productId)
      .then(res => res.data)
      .then(addedProduct => {
        dispatch(addToCart(addedProduct));
      })
      .catch(err => console.error(`Add to cart unsuccessful`, err));
  }
}

export function minusFromCart (productId) {
  return function thunk (dispatch) {
    return axios.put('/api/cart/minus', productId)
      .then(res => res.data)
      .then(subtractedProduct => {
        dispatch(minusOneFromCart(subtractedProduct));
      })
      .catch(err => console.error(`Minus from cart unsuccessful`, err));
  }
}

export function deleteProductFromCart (productId) {
  return function thunk (dispatch) {
    return axios.put('/api/cart/delete', productId)
      .then(res => res.data)

      .then(cart => {
        dispatch(deleteProdFromCart(cart));
      })
      .catch(err => console.error(`Delete product from cart unsuccessful`, err));
  }
}

//REDUCER
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;

    case ADD_TO_CART:
      return {
        ...state,
        ...action.product
      }

    case MINUS_FROM_CART:
      return {
        ...state,
        ...action.product
      }

    case DELETE_PRODUCT_FROM_CART:
      return action.cart;

    default:
      return state;
  }
}

