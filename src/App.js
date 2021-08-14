import React, {Suspense} from 'react'
import {Switch,Route} from "react-router-dom";
import Home from "./pages/Home";
import Layout from './components/Layout'

const About = React.lazy(() => import('./pages/About'))
const Users = React.lazy(() => import('./pages/Users'))

const App = () => {
  return (
    <Layout>
      <Suspense fallback={
        <p>Loading...</p>
      }>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App