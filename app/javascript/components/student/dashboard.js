import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import { ApproveNotice, Goal } from '@components/shared/goal'
import {Header, SubHeader, Title, Subtitle} from '@components/shared/header'
import {Button} from '@components/shared/input'
import AccountSummary from '@components/shared/account_summary'

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

const StudentDashboard = (props) => {
  const [studentInfo, setStudentInfo] = useState({})
  const [goals, setGoals] = useState([]) 

  useEffect(()=> { 
    httpClient.get('/api/students')
    .then(response => {
      setStudentInfo(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [studentInfo.size])

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
      <AccountSummary studentInfo={studentInfo} />      
      <SubHeader>
        <Subtitle>Your Goals</Subtitle>
        <Link to='/goals/new'>
          <Button>Add a new Goal</Button>
        </Link>
        </SubHeader>
      <ListContainer>
        {
          goals.map((item)=>{
            return <StyledLink key={item.id} to={`goals/${item.id}`}>
              <Goal>
                <ApproveNotice approvedDate={item.approved_date} />
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