import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import NavBar from './nav_bar'
import Index from './rewards'
import Show from './rewards/show'
import New from './rewards/new'

const Reward = (props) => { 
  let {path, url} = useRouteMatch()

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={path} component={Index} />
        <Route exact path={`${path}/:rewardId`} component={Show} />
        <Route exact path={`${path}/new`} component={New} />
      </Switch>       
    </>
  )
}

export default Reward