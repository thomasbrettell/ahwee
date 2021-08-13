import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector} from 'react-redux'

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.cartItems)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0
        ? (
          <li className={classes['cart-empty']}><h3>No items in cart</h3></li>
        )
        : (
          <ul>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item}/>
          ))}
          </ul>
        )
      }
    </Card>
  );
};

export default Cart;
