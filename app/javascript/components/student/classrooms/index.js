import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import {Header, Title} from '@components/shared/header'
import {Button} from '@components/shared/input'

import httpClient from '@utils/http_client'

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const Classroom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  width: 150px;
  height: 150px;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: white;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const ClassroomsIndex = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(()=> { 
    httpClient.get('/api/class_participants')
    .then(response => {
      setClassrooms(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [classrooms.length])
  
  return (
    <>
      <Header>
        
        <Link to='/classrooms/new'>
          <Button>Join a new Classroom</Button>
        </Link>
        <Title>Classrooms</Title>
      </Header>
      <ListContainer>
        {
          classrooms.map((item)=>{
            return <StyledLink key={item.participantId} to={`classrooms/${item.participantId}`}>
              <Classroom>
                <h2>{item.classroom.name}</h2>
              </Classroom>
            </StyledLink>
          })
        }
      </ListContainer>
    </>
  )
}

export default ClassroomsIndex