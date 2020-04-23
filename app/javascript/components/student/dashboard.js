import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '@utils/http_client'

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

const StudentDashboard = (props) => {
  const [goals, setGoals] = useState([]) 

  useEffect(()=> { 
    httpClient.get('/api/goals')
    .then(response => {
      setGoals(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goals.length])

  return (
    <>
      <Header>
        <Title>Your Student Dashboard</Title>
      </Header>
      <SubHeader>
        <Subtitle>Your Goals</Subtitle>
        <Link to='/goals/new'><h3>+ Add a new Goal</h3></Link>
        </SubHeader>
      <ListContainer>
        {
          goals.map((item)=>{
            return <StyledLink key={item.id} to={`goals/${item.id}`}>
              <Goal>
                <h4>Goal: {item.title}</h4>
                <p>Description: {item.description}</p>
                <h4>Class: {item.classroom_name}</h4>
                <h4>Due Date: {item.due_date}</h4>
                <h4>Achievement Points: {item.achievement_points}</h4>
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

export default connect(mapStateToProps)(StudentDashboard)