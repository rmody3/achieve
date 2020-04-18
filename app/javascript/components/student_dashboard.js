import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  padding: 10px 10px;
  width: 100%;
  margin-left: 150px
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%
`

const Title = styled.h1`
  padding-right: 50px;
`

const StudentDashboard = (props) => {
  return (
    <Container>
      <Header>
        <Title>Your Student Dashboard</Title>
      </Header>
    </Container>
  )    
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.bootstrap.loggedIn,
    user: state.bootstrap.user
  }
}

export default connect(mapStateToProps)(StudentDashboard)