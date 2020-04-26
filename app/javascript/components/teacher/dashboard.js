import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import {Header, SubHeader, Title, Subtitle} from '@components/shared/header'
import { Goal } from '@components/shared/goal'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const TeacherDashboard = (props) => {
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
        <Title>Your Teacher Dashboard</Title>
      </Header>
      <SubHeader><Subtitle>Recent Updates</Subtitle></SubHeader>
      <ListContainer>
        {
          goals.map((item)=>{
            return <StyledLink key={item.id} to={`goals/${item.id}`}>
              <Goal
                title={item.title}
                approved_date={item.approved_date}
                email={item.email}
                classroom_name={item.classroom_name}
                due_date={item.due_date}
                achievement_points={item.achievement_points}
                description={item.description}
              />
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