import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import NavBar from './nav_bar'
import Index from './rewards'
import New from './rewards/new'

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

const Reward = (props) => { 
  let {path, url} = useRouteMatch()

  return (
    <Layout>
      <Switch>
        <Route exact path={path} component={Index} />
        <Route exact path={`${path}/new`} component={New} />
      </Switch>       
    </Layout>
  )
}

export default Reward