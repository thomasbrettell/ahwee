import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const postApply = () => {
    cartCtx.resetCart()
    resetEmailInput()
    resetNameInput()
  }

  const {
    isLoading,
    error,
    sendRequest
  } = useHttp(postApply)

  if(error) {
    console.log(error)
  }

  const {
    inputValue: nameValue,
    inputIsValid: nameIsValid,
    inputIsInvalid: nameIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetNameInput
  } = useInput((inputIsValid) => {return inputIsValid.trim() !== ''})

  const {
    inputValue: emailValue,
    inputIsValid: emailIsValid,
    inputIsInvalid: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput
  } = useInput((inputIsValid) => {return inputIsValid.includes('@')})

  const formIsValid = emailIsValid && nameIsValid

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const updatedItem = {
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price
    }
    cartCtx.addItem(updatedItem);
  };

  const submitOrderHandler = (e) => {
    e.preventDefault()
    emailBlurHandler()
    nameBlurHandler()

    if(formIsValid) {
      const transformedData = {
        order_name: nameValue,
        order_email: emailValue,
        order: cartCtx.items
      }

      sendRequest({
        url: 'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/orders.json',
        body:transformedData,
        method: 'POST',
        header: {'Content-Type': 'application/json'}
      })
    }
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <form className={classes.form} onSubmit={submitOrderHandler}>
        <label className={`${nameIsInvalid ? classes.invalid : ''}`}>
          <span>Name</span>
          <input
            type='text'
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </label>
        <label className={`${emailIsInvalid ? classes.invalid : ''}`}>
          <span>Email</span>
          <input
            type='text'
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
        </label>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && <button className={classes.button} type='submit'>{isLoading ? 'Loading' : "Order"}</button>}
        </div>
      </form>
    </Modal>
  );
};

export default Cart;
