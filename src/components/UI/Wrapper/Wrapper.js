import styles from './Wrapper.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

const Wrapper = (props) => {
  const className = cx({
    Wrapper: true,
    flex: props.flex
  });

  return (
    <div className={className}>{props.children}</div>
  )
}

export default Wrapper