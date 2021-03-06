import React from 'react'
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from '../nav_bar'
import Dashboard from './dashboard'
import GoalsNew from './goals/new'
import GoalsShow from './goals/show'
import ClassroomsIndex from './classrooms/index'
import ClassroomShow from './classrooms/show'
import ClassroomsNew from './classrooms/new'
import RewardsIndex from './rewards/index'

const Container = styled.div`
  width: 100%;
  margin-left: 180px;
  padding: 10px;
`

const Layout = (props) => {
  return (
    <>
      <NavBar />
      <Container>
        {props.children}
      </Container>
    </>
  )
}

const Home = (props) => { 

  return (
    <Layout>
      <Switch>
        <Route exact path={'/dashboard'} component={Dashboard} />
        <Route exact path={'/goals/new'} component={GoalsNew} />
        <Route exact path={'/goals/:id'} component={GoalsShow} />
        <Route exact path={'/classrooms'} component={ClassroomsIndex} />
        <Route exact path={'/classrooms/new'} component={ClassroomsNew} />
        <Route exact path={'/classrooms/:id'} component={ClassroomShow} />
        <Route exact path={'/rewards'} component={RewardsIndex} />
        <Route path={'/'} component={Dashboard} />
      </Switch>       
    </Layout>
  )
}

export default Home