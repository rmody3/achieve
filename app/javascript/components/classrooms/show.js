import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '../../utils/http_client'

import {Header, Title} from '../shared/header'

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const Participant = styled.div`
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
  const [classroom, setClassroom] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(()=> { 
    httpClient.get(`/api/classrooms/${classroomId}`)
    .then(response => {
      setClassroom(response.data.classroom)
      setStudents(response.data.students)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [students.length])

  const showStudents = () => {
    if (students.length > 0) {
      return (
        students.map((item)=>{
          return <StyledLink key={item.id} to={`students/${item.id}`}>
            <Participant>
              <h3>{item.email}</h3>
            </Participant>
          </StyledLink>
        })
      )
    } else {
      return (
        <h3>
          {`No Students are in this class at this time. Make sure to send them the classroom Join Code: ${classroom.join_code}`}
        </h3>
      )
    }
  }
  
  return (
    <>
      <Header>
        <Title>{classroom.name}</Title>
      </Header>
      <ListContainer>
        {showStudents()}
      </ListContainer>
    </>
  )
}

export default ClassroomShow