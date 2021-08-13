import { configureStore} from '@reduxjs/toolkit'
import productsReducer from './products-slice'
import cartReducer from './cart-slice'
import UIReducer from './ui-slice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    UI: UIReducer
  }
})

export default store