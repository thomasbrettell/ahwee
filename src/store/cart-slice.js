import {createSlice} from '@reduxjs/toolkit'
import { UIActions } from './ui-slice'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
    totalQuantity: 0,
    cartIsLoaded: false
  },
  reducers: {
    setCartItems(state, action) {
      state.cartIsLoaded = true
      let item = action.payload

      const foundItem = state.cartItems.find((e) => e.id === item.id)

      if (foundItem) {
        foundItem.quantity = foundItem.quantity + item.amount
        state.totalQuantity = state.totalQuantity + item.amount

        if(foundItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== foundItem.id)
          return
        }

        foundItem.total = foundItem.price * foundItem.quantity
      } else {
        item.quantity = 1
        state.totalQuantity = state.totalQuantity + 1
        item.total = item.price
        delete item.amount
        state.cartItems.push(item)
      }
    },
    setCart(state, action) {
      if(!action.payload) {
        return
      }
      state.cartItems = action.payload

      state.cartItems.forEach((item) => {
        state.totalQuantity = state.totalQuantity + item.quantity
      })
    },
    toggleCart(state) {
      state.showCart = !state.showCart
    }
  }
})

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(UIActions.setNotification({
      status: 'sending',
      title: 'Sending...',
      message: 'Sending cart data'
    }))

    try {
      const response = await fetch(
        'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartData)
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      dispatch(UIActions.setNotification({
        status: 'success',
        title: 'Sent!',
        message: 'Data successfully sent to cart'
      }))

      dispatch(UIActions.setNotification(null))
    } catch (err) {
      dispatch(UIActions.setNotification({
        status: 'error',
        title: 'Error!',
        message: err.message
      }))
    }
  }
}

export const getCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      dispatch(cartActions.setCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const cartActions = cartSlice.actions

export default cartSlice.reducer