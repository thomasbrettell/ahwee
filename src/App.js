import React, {Suspense} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Quotes from './pages/Quotes'
import Layout from './components/layout/Layout'
import { getQuotesData } from './store/quotes-slice'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import LoadingSpinner from './components/UI/LoadingSpinner'

const Quote = React.lazy(() => import('./pages/Quote'))
const AddQuote = React.lazy(() => import('./pages/AddQuote'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getQuotesData())
  }, [dispatch])

  return (
    <Layout>
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner />
        </div>
      }>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes'/>
          </Route>
          <Route path='/quotes' exact>
            <Quotes />
          </Route>
          <Route path='/quotes/:id'>
            <Quote />
          </Route>
          <Route path='/add-quote'>
            <AddQuote />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
