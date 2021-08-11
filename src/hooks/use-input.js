import { useReducer } from "react"

const inputReducer = (state, action) => {
  if(action.type === 'INPUT_CHANGED') {
    return {
      inputValue: action.value,
      inputTouched: state.inputTouched
    }
  }

  if (action.type === 'INPUT_TOUCHED') {
    return {
      inputValue: state.inputValue,
      inputTouched: action.value
    }
  }

  return {
    inputValue: '',
    inputTouched: false
  }
}

const useInput = (validate) => {
  const [inputState, inputStateDispatch] = useReducer(inputReducer, {
    inputValue: '',
    inputTouched: false
  });
  const {inputValue} = inputState
  const {inputTouched} = inputState

  const inputIsValid = validate(inputValue)
  const inputIsInvalid = !inputIsValid && inputTouched

  const inputChangeHandler = (e) => {
    inputStateDispatch({type: 'INPUT_CHANGED', value: e.target.value})
  }

  const inputBlurHandler = () => {
    inputStateDispatch({type: 'INPUT_TOUCHED', value: true})
  }

  const resetInput = () => {
    inputStateDispatch({type: 'INPUT_CHANGED', value: ''})
    inputStateDispatch({type: 'INPUT_TOUCHED', value: false})
  }

  return {
    inputValue,
    inputIsValid,
    inputIsInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetInput
  }
}

export default useInput