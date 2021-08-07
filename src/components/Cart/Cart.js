import { useContext, useState } from 'react';
import styles from './Cart.module.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartContext from '../../context/cart-context';
import CartModal from './CartModal'

const Cart = () => {
  const ctx = useContext(CartContext)
  const [cartIsShown, setCartIsShown] = useState(false)

  const toggleCartHandler = (state) => {
    setCartIsShown(state)
  }

  let totalItems = 0
  ctx.items.forEach((item) => {
    totalItems = totalItems + item.quantity
  })

  return (
    <>
    <button className={styles.Cart} onClick={toggleCartHandler}>
      <ShoppingCartIcon />
      <span>Your cart</span>
      <div className={styles.num}>{totalItems}</div>
    </button>
    {cartIsShown && <CartModal onHideCart={toggleCartHandler} />}
    </>
  )
}

export default Cart