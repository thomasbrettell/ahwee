import styles from './Card.module.css'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles);

const Card = (props) => {
  const classes = cn({
    Card: true,
    modal: props.modal
  });

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default Card