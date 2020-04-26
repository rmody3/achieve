import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import {Header, Title, SubHeader, Subtitle} from '@components/shared/header'
import { ApproveNotice, Goal } from '@components/shared/goal'
import AccountSummary from '@components/shared/account_summary'

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const ParticipantShow = () => {
  let { id } = useParams()
  const [goals, setGoals] = useState([])
  const [classroom, setClassroom] = useState()
  const [studentInfo, setStudentInfo] = useState({})

  useEffect(()=> { 
    httpClient.get(`/api/class_participants/${id}`)
    .then(response => {
      setGoals(response.data.goals)
      setClassroom(response.data.classroom)
      setStudentInfo(response.data.student_info)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goals.length])

  const showGoals = () => {
    if (goals.length > 0) {
      return (
        goals.map((item)=>{
          return <StyledLink key={item.id} to={`/goals/${item.id}`}>
            <Goal>
              <ApproveNotice approvedDate={item.approved_date} />
              <h4>Goal: {item.title}</h4>
              <p>Description: {item.description}</p>
              <h4>Due Date: {item.due_date}</h4>
              <h4>Achievement Points: {item.achievement_points}</h4>
            </Goal>
          </StyledLink>
        })
      )
    } else {
      return (
        <h3 style={{'paddingLeft': '20px'}}>
          Student does not have any goals for this class yet
        </h3>
      )
    }
  }
  
  return (
    <>
      <Header>
        <Title>{classroom ? studentInfo.email + ' for ' + classroom.name : 'Loading'}</Title>
      </Header>
      <AccountSummary studentInfo={studentInfo} />
      <SubHeader>
        <Subtitle>Student's Goals</Subtitle>
      </SubHeader>      
      <ListContainer>
        {showGoals()}
      </ListContainer>
    </>
  )
}

export default ParticipantShow