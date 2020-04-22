import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import {Header, SubHeader, Title, Subtitle} from '@components/shared/header'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50%;
  min-hieght: 100px;
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const goals = [
  {
    id: 1,
    participant: 'John Doe',
    title: 'Read 5 books',
    description: 'This quarter I want to read 5 books',
    due_date: '4/1/2020'
  },
  {
    id: 2,
    participant: 'Alice',
    title: 'Get a b or higher on every test',
    description: 'This quarter I want to maintain high grades on my tests',
    due_date: '4/1/2020'
  },
  {
    id: 3,
    participant: 'Bob',
    title: 'Help mentor another student',
    description: 'This quarter I want help another student with any problems they might have',
    due_date: '4/1/2020'
  }
]

const TeacherDashboard = (props) => {
  return (
    <>
      <Header>
        <Title>Your Teacher Dashboard</Title>
      </Header>
      <SubHeader><Subtitle>Recent Updates</Subtitle></SubHeader>
      <ListContainer>
        {
          goals.map((item)=>{
            return <StyledLink key={item.id} to={`goals/${item.id}`}>
              <Goal>
                <h4>Goal: {item.title}</h4>
                <p>Description: {item.description}</p>
                <h4>Student: {item.participant}</h4>
                <h4>Due Date: {item.due_date}</h4>
              </Goal>
            </StyledLink>
          })
        }
      </ListContainer>
    </>
  )    
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.bootstrap.loggedIn,
    user: state.bootstrap.user
  }
}

export default connect(mapStateToProps)(TeacherDashboard)