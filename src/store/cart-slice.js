import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
    totalQuantity: 0
  },
  reducers: {
    setCartItems(state, action) {
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
        state.cartItems.push(item)
      }
    },
    toggleCart(state) {
      state.showCart = !state.showCart
    }
  }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer