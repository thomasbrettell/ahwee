import {createSlice} from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    }
  }
})

export const getProductsData = () => {
  return async (dispatch) => {
    dispatch(productsActions.setProducts('LOADING'))

    try {
      const response = await fetch(
        'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          price: data[key].price
        });
      }

      dispatch(productsActions.setProducts(loadedProducts))
    } catch (err) {
      console.log(err)
    }
  }
}

export const productsActions = productsSlice.actions

export default productsSlice.reducer