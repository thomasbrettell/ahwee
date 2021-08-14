import React, {Suspense} from 'react'
import { Route, Switch } from "react-router-dom";
// import Home from './pages/Home'
// import About from './pages/About'

const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))

function App() {
  return (
    <Suspense fallback={
      <p>Loading...</p>
    }>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
