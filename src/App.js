import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import useHttp from './hooks/use-http';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { productsActions } from './store/products-slice';

function App() {
  const dispatch = useDispatch()

  const showCart = useSelector(state => state.cart.showCart)

  const returnData = useCallback((data) => {
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
  }, [dispatch])

  const {isLoading, error, sendRequest} = useHttp(returnData)

  useEffect(() => {
      dispatch(productsActions.setLoading(isLoading))
  }, [dispatch, isLoading])

  if(error) {
    console.log(error)
  }

  useEffect(() => {
    sendRequest({
      url: 'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/products.json'
    })
  }, [sendRequest])
  
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
