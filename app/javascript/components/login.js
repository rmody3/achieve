import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '../utils/http_client'

import { setBootstrapData } from '../actions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  height: 50%;
`

const SelectContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 50%;
  justify-content: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  border: 1px solid black;
  height: 50px;
  border-radius: 8px;
  margin: 20px 20px;

  &.active {
    border: 2px solid black;
    background-color: grey;
    color: white; 
  }
`

const Input = styled.input`
  border: 1px solid black;
  border-radius: 8px;
  margin: 5px 0px 20px 0px;
  height: 40px;
  width: 100%
`

const Label = styled.label`
  display: flex
  flex-direction: column;
`

const Submit = styled.button`
  background-color: blue;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  margin: 20px 0px;
  height: 40px;
  width: 80px;
`

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState('student');

  const handleLogin = (e) => {
    e.preventDefault()

    let body = {}
    body[userType] = {
      email: email,
      password: password
    }

    httpClient.post(`/${userType + 's'}/sign_in`, body)
    .then(response => {
      if (response.data.logged_in) {
        props.setBootstrapData({
          loggedIn: response.data.logged_in,
          user: response.data.user,
          userType: response.data.user_type
        })
      } 
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }

  if (props.loggedIn) {
    return <Redirect to='/dashboard' />
  } else {
    return (
      <Container>
        <h2>Welcome to Achieve</h2>
        <h4> Login to your Account</h4>
        <Label>        
          <div>Select Account:</div>
          <SelectContainer>
            <Button 
              className={userType == 'student' ? 'active' : ''} 
              onClick={() => setUserType('student')}
            >
              Student
            </Button>
            <Button 
              className={userType == 'teacher' ? 'active' : ''} 
              onClick={() => setUserType('teacher')}
            >
              Teacher
            </Button>
          </SelectContainer>
        </Label>

        <Label>
          <div>Email:</div>
          <Input 
            type='text'
            id='email' 
            placeholder='email'
            onChange={event => setEmail(event.target.value)}
          />
        </Label>
       
        <Label>
          <div>Password:</div>
          <Input 
            type='password'
            id='password' 
            placeholder='password'
            onChange={event => setPassword(event.target.value)}
          />
        </Label>

        <Footer>
          <Link to='/signup'>Or Signup</Link>
          <Submit onClick={handleLogin}>Login</Submit>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.bootstrap.loggedIn,
    user: state.bootstrap.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBootstrapData: (data) => dispatch(setBootstrapData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)