import {createSlice} from '@reduxjs/toolkit'

const quotesSlice = createSlice({
  name: 'auth',
  initialState: {
    quotes: [],
    status: null
  },
  reducers: {
    addQuote(state, action) {
      state.quotes.push(action.payload)
    },
    setQuotes(state, action) {
      state.quotes = action.payload
    },
    updateStatus(state, action) {
      state.status = action.payload
    }
  }
})

export const addQuoteData = (quoteData) => {
  return async (dispatch) => {
    dispatch(quotesActions.updateStatus('LOADING'))

    try {
      const response = await fetch(
        'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/quotes.json',
        {
          method: 'POST',
          body: JSON.stringify(quoteData),
          headers: {'Content-Type': 'application/json'}
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      
      let transformedData = quoteData
      transformedData.id = data.name

      dispatch(quotesActions.addQuote(transformedData))
      dispatch(quotesActions.updateStatus('DONE'))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getQuotesData = () => {
  return async (dispatch) => {
    dispatch(quotesActions.setQuotes('LOADING'))

    try {
      const response = await fetch(
        'https://react-http-learning-e8ee3-default-rtdb.firebaseio.com/quotes.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: key,
          author: data[key].author,
          text: data[key].text
        });
      }

      dispatch(quotesActions.setQuotes(loadedProducts))
    } catch (err) {
      console.log(err)
    }
  }
}

export const quotesActions = quotesSlice.actions

export default quotesSlice.reducer