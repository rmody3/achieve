import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import {Header, Title} from '@components/shared/header'

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
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const ClassroomsIndex = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(()=> { 
    httpClient.get('/api/classrooms')
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
        <Link to='/classrooms/new'><h3>+ Join a Classroom</h3></Link>
        <Title>Classrooms</Title>
      </Header>
      <ListContainer>
        {
          classrooms.map((item)=>{
            return <StyledLink key={item.id} to={`classrooms/${item.id}`}>
              <Classroom>
                <h2>{item.name}</h2>
              </Classroom>
            </StyledLink>
          })
        }
      </ListContainer>
    </>
  )
}

export default ClassroomsIndex