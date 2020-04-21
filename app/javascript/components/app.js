import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'

import Dashboard from './dashboard'
import Login from './login'
import Signup from './signup'
import Classroom from './classroom'
import Reward from './reward'

import { setBootstrapData } from '../actions'

const App = (props) => { 
  props.setBootstrapData()

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/classrooms' component={Classroom} />
        <Route path='/rewards' component={Reward} />
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