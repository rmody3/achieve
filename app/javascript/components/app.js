import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'

import Home from './home'
import Login from './login'
import Signup from './signup'

import { setBootstrapData } from '../actions'

const App = (props) => { 
  props.setBootstrapData()

  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/' component={Home} />
      </Switch>       
    </Router>
  )
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setBootstrapData: () => dispatch(setBootstrapData(props.data))
  }
}

export default connect(null, mapDispatchToProps)(App)