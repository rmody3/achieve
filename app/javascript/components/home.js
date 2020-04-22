import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import TeacherHome from './teacher/home'
import StudentHome from './student/home'


const Container = styled.div`
  display: flex;
  width: 100%;
`

const Dashboard = (props) => {

  if (props.loggedIn) {
   return(
    <Container>
      { props.userType == 'teacher' ? <TeacherHome /> : <StudentHome /> }
    </Container>
   )
  } else {
    return <Redirect to='/login' />
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.bootstrap.loggedIn,
    user: state.bootstrap.user,
    userType: state.bootstrap.userType
  }
}

export default connect(mapStateToProps)(Dashboard)