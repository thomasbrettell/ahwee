import QuoteList from '../components/quotes/QuoteList'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Quotes = () => {
  const quotes = useSelector(state => state.quotes.quotes)
  
  if(quotes === 'LOADING') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section>
      <QuoteList quotes={quotes}/>
    </section>
  )
}

export default Quotes