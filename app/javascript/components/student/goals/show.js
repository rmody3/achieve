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
  width: 100%;
  height: 200px;
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  word-wrap: normal;
`

const GoalShow = () => {
  let { id } = useParams()
  const [goal, setGoal] = useState({})

  useEffect(()=> { 
    httpClient.get(`/api/goals/${id}`)
    .then(response => {
      setGoal(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goal.size])
  
  return (
    <>
      <Header>
        <Title>Goal: {goal ? goal.title : 'Loading'}</Title>
      </Header>
      <ListContainer>
        <Goal>
          <p>Description: {goal.description}</p>
          <h4>Due Date: {goal.due_date}</h4>
          <h4>Achievement Points: {goal.achievement_points}</h4>
        </Goal>
      </ListContainer>
    </>
  )
}

export default GoalShow