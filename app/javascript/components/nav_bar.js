import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '../utils/http_client'

import { setBootstrapData } from '../actions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 95%;
  border-right: 2px solid grey;
  width: 140px;
  padding: 20px;
  align-items: center;
  text-align: center;
  position: fixed; 
`

const Button = styled.button`
  height: 100px;
  width: 100px;
  border: 2px solid black;
  border-radius: 8px
`

const NavBar = (props) => {

  const handleLogout = () => {
    httpClient.delete(`/${props.userType + 's'}/sign_out`)
    .then(response => {
      props.setBootstrapData({
        loggedIn: false,
        user: null,
        userType: null
      })
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }

  return (
    <Container>
      <div>
        <h1>Achieve</h1>
        <p>Welcome</p>
        <p>{props.user.email}</p>
      </div>
      <Link to="/dashboard"><Button>Dashboard</Button></Link> 
      <Link to="/classrooms"><Button>Classrooms</Button></Link> 
      <Link to="/rewards"><Button>Rewards</Button></Link>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.bootstrap.user,
    userType: state.bootstrap.userType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBootstrapData: (data) => dispatch(setBootstrapData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)