import {Route, useParams, Link, useRouteMatch} from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import Comments from '../components/comments/Comments'
import { useSelector } from 'react-redux'
import NoQuoteFound from '../components/quotes/NoQuotesFound'

const Quote = () => {
  const match = useRouteMatch()
  const params = useParams()
  const quotes = useSelector(state => state.quotes.quotes)
  const quote = quotes.find(e => e.id === params.id)

  if(!quote) {
    return (
      <NoQuoteFound />
    )
  }

  return(
    <section>
      <HighlightedQuote
        text={quote.text}
        author={quote.author}
      />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link to={`${match.url}/comments`} className='btn--flat'>
            Show comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  )
}

export default Quote