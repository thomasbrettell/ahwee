import { useEffect, useRef, useState } from 'react';
import { useHistory, Prompt } from 'react-router';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';
import { useDispatch } from 'react-redux';
import { addQuoteData } from '../../store/quotes-slice'
import { useSelector } from 'react-redux';
import { quotesActions } from '../../store/quotes-slice';


const QuoteForm = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isEntering, setIsEntering] = useState(false)
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const status = useSelector(state => state.quotes.status)

  const finishSubmissionHandler = () => {
    setIsEntering(false)
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const newQuote = {
      author: authorInputRef.current.value,
      text: textInputRef.current.value 
    }

    dispatch(addQuoteData(newQuote))
  }

  useEffect(() => {
    if(status === 'DONE') {
      history.push('/quotes')
      dispatch(quotesActions.updateStatus(null))
    }
  }, [status, history, dispatch])

  const formFocusHandler = () => {
    setIsEntering(true)
  }

  return (
    <>
    <Prompt when={isEntering} message={() => 'Are you sure you want to leave? All your entered data will be lost.'} />
    <Card>
      <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {status === 'LOADING' && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={finishSubmissionHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
    </>
  );
};

export default QuoteForm;
