import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import {Header, Title} from '@components/shared/header'

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  word-wrap: normal;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const ClassroomShow = () => {
  let { classroomId } = useParams()
  const [goals, setGoals] = useState([])
  const [classroom, setClassroom] = useState()

  useEffect(()=> { 
    httpClient.get(`/api/class_participants/${classroomId}`)
    .then(response => {
      setGoals(response.data.goals)
      setClassroom(response.data.classroom)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goals.length])

  const showGoals = () => {
    if (goals.length > 0) {
      return (
        goals.map((item)=>{
          return <StyledLink key={item.id} to={`goals/${item.id}`}>
            <Goal>
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
        <Link to="goals/new">
          <h3>
            {"You dont have any goals for this class, set one up now"}
          </h3>
        </Link>
        
      )
    }
  }
  
  return (
    <>
      <Header>
        <Title>{classroom ? classroom.name : 'Loading'}</Title>
      </Header>
      <ListContainer>
        {showGoals()}
      </ListContainer>
    </>
  )
}

export default ClassroomShow