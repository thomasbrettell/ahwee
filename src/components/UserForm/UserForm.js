import { useRef } from 'react'
import styles from './UserForm.module.css'
import Button from '../ui/Button/Button'

const UserForm = (props) => {
  const nameInputRef = useRef()
  const ageInputRef = useRef()

  let user = {}
  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    if(!user.name && !user.age) {
      props.onInvalidSubmission(true, 'Missing user name and age')
    } else if(!user.name){
      console.log(user)
      props.onInvalidSubmission(true, 'Missing user name')
    } else if(!user.age) {
      props.onInvalidSubmission(true, 'Missing user age')
    } else {
      console.log(user)
      props.onAddUser(user)
      user = {}
      e.target.reset()
    }
  }

  const onChangeHandler = (e) => {
    console.log(nameInputRef)
    user[e.target.name] = e.target.value
  }

  return (
    <form className={styles.UserForm} onSubmit={onSubmitHandler}>
      <label>
        <span>User name</span>
        <input type='text' autoFocus name='name' onChange={onChangeHandler} ref={nameInputRef}></input>
      </label>
      <label>
        <span>Age (years)</span>
        <input type='number' name='age' onChange={onChangeHandler} ref={ageInputRef}></input>
      </label>
      <Button type='submit'>Add user</Button>
    </form>
  )
}

export default UserForm