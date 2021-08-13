import {createSlice} from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const productsActions = productsSlice.actions

export default productsSlice.reducer