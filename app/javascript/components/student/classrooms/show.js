import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import { Goal } from '@components/shared/goal'
import {Header, Title} from '@components/shared/header'

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

const ClassroomShow = () => {
  let { id } = useParams()
  const [goals, setGoals] = useState([])
  const [classroom, setClassroom] = useState()

  useEffect(()=> { 
    httpClient.get(`/api/class_participants/${id}`)
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
          return <StyledLink key={item.id} to={`/goals/${item.id}`}>
            <Goal
              title={item.title}
              approved_date={item.approved_date}
              due_date={item.due_date}
              achievement_points={item.achievement_points}
              description={item.description}
            />
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