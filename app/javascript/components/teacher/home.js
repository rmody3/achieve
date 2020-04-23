import React from 'react'
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from '../nav_bar'
import Dashboard from './dashboard'
import ClassroomsIndex from './classrooms'
import ClassroomsNew from './classrooms/new'
import ClassroomsShow from './classrooms/show'
import RewardsIndex from './rewards'
import RewardsNew from './rewards/new'

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
        <Route exact path={'/classrooms'} component={ClassroomsIndex} />
        <Route exact path={'/classrooms/new'} component={ClassroomsNew} />
        <Route exact path={'/classrooms/:classroomId'} component={ClassroomsShow} />
        <Route exact path={'/rewards'} component={RewardsIndex} />
        <Route exact path={'/rewards/new'} component={RewardsNew} />
        <Route path={'/'} component={Dashboard} />
      </Switch>       
    </Layout>
  )
}

export default Home