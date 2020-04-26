import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import { ApproveNotice, Goal } from '@components/shared/goal'
import {Header, SubHeader, Title, Subtitle} from '@components/shared/header'
import {Button} from '@components/shared/input'

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

const AccountSummaryContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 40px;
  justify-content: space-between;
`

const AccountSummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 10px;
  background-color: #FFC447;
  width: 28%;
  height: 200px;
`

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Strong = styled.strong`
  padding: 5px 0px;
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
      <AccountSummaryContainer>
        <AccountSummaryBox>
          <h3>CURRENT LEVEL</h3>
        </AccountSummaryBox>
        <AccountSummaryBox>
          <h3>YOUR BADGES</h3>
          <BadgeList></BadgeList>
        </AccountSummaryBox>
        <AccountSummaryBox>
          <h3>ACHIEVEMENT POINTS EARNED</h3>
          <h3>ACHIEVEMENTS POINTS LEFT</h3>
        </AccountSummaryBox>
      </AccountSummaryContainer>
      
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