import { configureStore} from '@reduxjs/toolkit'
import quotesReducer from './quotes-slice'

const store = configureStore({
  reducer: {
    quotes: quotesReducer
  }
})

export default store