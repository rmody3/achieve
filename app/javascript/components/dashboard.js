import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './nav_bar'
import TeacherDashboard from './teacher_dashboard'
import StudentDashboard from './student_dashboard'


const Container = styled.div`
  display: flex;
  width: 100%;
`

const Dashboard = (props) => {

  const currentDashboard = null

  

  if (props.loggedIn) {
   return(
    <Container>
      <NavBar />
      { props.userType == 'Teacher' ? <TeacherDashboard /> : <StudentDashboard /> }
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