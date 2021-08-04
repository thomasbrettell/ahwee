import styles from './Cart.module.less'

const Cart = () => {
  return (
    <div className={styles.Cart}>
      <span>Your cart</span>
      <div>0</div>
    </div>
  )
}

export default Cart