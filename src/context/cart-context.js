import React from 'react'

const CartContext = React.createContext({
  cartAmount: 0,
  increaseCartAmount: () => {},
  items: []
})

export default CartContext 