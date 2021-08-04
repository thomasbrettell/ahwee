import React, { useRef, useImperativeHandle } from 'react'
import styles from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef()

  const changeHandler = (e) => {
    props.onInputChange(e.target.value)
  }
  
  const activate = () => {
    inputRef.current.focus()
  }

  useImperativeHandle(ref, () => {
    return {
      activate: activate
    }
  })

  return (
    <div
    className={`${styles.control} ${
      props.isValid === false ? styles.invalid : ''
    }`}
  >
    <label htmlFor={props.type}>{props.label}</label>
    <input
      ref={inputRef}
      type={props.type}
      id={props.type}
      value={props.value}
      onChange={changeHandler}
    />
  </div>
  )
})

export default Input