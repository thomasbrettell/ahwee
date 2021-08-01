import styles from './User.module.css'

const User = (props) => {
  return (
    <div className={styles.User}>
      {props.user.name} ({props.user.age} years old)
    </div>
  )
}

export default User