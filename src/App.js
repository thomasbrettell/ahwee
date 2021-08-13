import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import Notification from './components/UI/Notification';
import {sendCartData, getCartData} from './store/cart-slice'
import {getProductsData} from './store/products-slice'

let isInitialLoad = true

function App() {
  const dispatch = useDispatch()

  const showCart = useSelector(state => state.cart.showCart)
  const cartIsLoaded = useSelector(state => state.cart.cartIsLoaded)
  const cartItems = useSelector(state => state.cart.cartItems)
  const notification = useSelector(state => state.UI.notification)

  useEffect(() => {
    dispatch(getCartData())
    dispatch(getProductsData())
  }, [dispatch])

  useEffect(() => {
    if(isInitialLoad) {
      isInitialLoad = false
      return
    }

    if(!cartIsLoaded) {
      return
    }

    dispatch(sendCartData(cartItems))
  }, [cartIsLoaded, cartItems, dispatch])
  
  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
