import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import NavBar from './nav_bar'
import Index from './classrooms'
import Show from './classrooms/show'
import New from './classrooms/new'

const Classroom = (props) => { 
  let {path, url} = useRouteMatch()

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={path} component={Index} />
        <Route exact path={`${path}/:classroomId`} component={Show} />
        <Route exact path={`${path}/new`} component={New} />
      </Switch>       
    </>
  )
}

export default Classroom