import styles from './CartModal.module.css'
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'
import CartItem from './CartItem'
import CartContext from '../../context/cart-context'
import { useContext } from 'react'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const CartModal = (props) => {
  const ctx = useContext(CartContext)

  let total = 0
  let items = []
  ctx.items.forEach((item) => {
    if(item.quantity !== 0) {
      items.push(item)
      total = Math.round((total + (item.price * item.quantity)) * 100) / 100
    }
  })

  let cartContent
  if(items.length !== 0) {
    cartContent = (
      items.map((item) => (
        <CartItem 
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          updateItem={ctx.updateItems}
        />
      ))
    )
  } else {
    cartContent = (
      <div className={styles.empty}>
        Cart is empty
        <SentimentVeryDissatisfiedIcon className={styles.icon}/>
      </div>
    )
  }

  return (
    <Modal onHideModal={props.onHideCart} className={styles.CartModal}>
      {cartContent}
      <div className={styles['price-section']}>
        <span>Total Amount:</span>
        <span className={styles.total}>${total}</span>
      </div>
      <div className={styles['modal-btns']}>
        <Button className={styles['close-btn']} secondary onClick={props.onHideCart}>Close</Button>
        <Button>Order</Button>
      </div>
    </Modal>
  )
}

export default CartModal