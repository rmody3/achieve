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
        <Route path={'/'} component={Dashboard} />
      </Switch>       
    </Layout>
  )
}

export default Home