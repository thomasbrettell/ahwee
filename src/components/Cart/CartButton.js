import classes from './CartButton.module.css';
import { useDispatch, useSelector} from 'react-redux'
import { cartActions } from '../../store/cart-slice';

const CartButton = (props) => {
  const dispatch = useDispatch()

  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
