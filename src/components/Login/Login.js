import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input'
import AuthContext from '../../context/auth-context';

const emailReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes('@')}
  }

  if(action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes('@')}
  }

  return state
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length >= 6}
  }

  if(action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length >= 6}
  }

  return state
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: undefined})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: undefined})

  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  const ctxAuth = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  useEffect(() => {
    const validityTimer = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 250)

    return () => {
      clearTimeout(validityTimer)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (value) => { 
    dispatchEmail({type: 'USER_INPUT', val: value})
  };

  const passwordChangeHandler = (value) => {
    dispatchPassword({val: value, type: 'USER_INPUT'})
  };

  // const validateEmailHandler = () => {
  //   dispatchEmail({type: 'INPUT_BLUR'})
  // };

  // const validatePasswordHandler = () => {
  //   dispatchPassword({type: 'INPUT_BLUR'})
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      ctxAuth.onLogin(emailState.value, passwordState)
      // props.onLogin(emailState.value, passwordState);
    } else if (!emailIsValid) {
      emailInputRef.current.activate()
    } else if (!passwordIsValid) {
      passwordInputRef.current.activate()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          value={emailState.value}
          onInputChange={emailChangeHandler}
          type={'email'}
          label={'E-Mail'}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          value={passwordState.value}
          onInputChange={passwordChangeHandler}
          type={'password'}
          label={'Password'}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
