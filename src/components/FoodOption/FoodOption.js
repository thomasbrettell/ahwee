import styles from './FoodOption.module.css'
import PlusOneIcon from '@material-ui/icons/PlusOne';
import Button from '../UI/Button/Button'

const FoodOption = (props) => {
  const clickHandler = () => {
    props.updateItem(props.id, props.quantity + 1)
  }

  const changeHandler = (e) => {
    props.updateItem(props.id, parseInt(e.target.value))
  }
 
  return (
    <div className={styles.FoodOption}>
      <div className={styles.left}>
        <span className={styles.title}>{props.title}</span>
        <span className={styles.desc}><em>{props.description}</em></span>
        <span className={styles.price}>${props.price}</span>
      </div>
      <div className={styles.right}>
        <label>
          <span>Amount</span>
          <input type='number' onChange={changeHandler} value={props.quantity} />
        </label>
        <Button onClick={clickHandler}><PlusOneIcon className={styles.icon} />Add</Button>
      </div>
    </div>
  )
}

export default FoodOption