import styles from './MainWrapper.module.css';

const MainWrapper = (props) => {
  return (
    <div className={styles.MainWrapper}>
      {props.children}
    </div>
  )
}

export default MainWrapper