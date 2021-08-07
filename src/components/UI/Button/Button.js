import classNames from 'classnames/bind';
import styles from './Button.module.css'
const cx = classNames.bind(styles);

const Button = (props) => {
  const buttonStyles = cx({
    Button: true,
    secondary: props.secondary,
    uniqueClass: props.className
  });

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <button ref={props.ref} className={`${buttonStyles} ${props.className}`} onClick={clickHandler}>{props.children}</button>
  )
}

export default Button