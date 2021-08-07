import styles from './CartItem.module.css'
import Button from '../UI/Button/Button'
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';

const CartItem = (props) => {
  const decreaseFood = () => {
    props.updateItem(props.id, props.quantity-1)
  }

  const increaseFood = () => {
    props.updateItem(props.id, props.quantity+1)
  }

  return (
    <div className={styles.CartItem}>
      <div className={styles.details}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.bottom}>
          <div className={styles.price}>${props.price}</div>
          <div className={styles.quantity}>{props.quantity}x</div>
        </div>
      </div>
      <div className={styles.btns}>
        <button onClick={decreaseFood}><ExposureNeg1Icon style={{ color: 'brown' }}/></button>
        <button onClick={increaseFood}><PlusOneIcon style={{ color: 'brown' }}/></button>
      </div>
    </div>
  )
}

export default CartItem