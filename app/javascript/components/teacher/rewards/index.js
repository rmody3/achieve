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

const Reward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  width: 200px;
  height: 400px;
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  overflow-wrap: break-word;
  padding: 10px
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const RewardsIndex = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(()=> { 
    httpClient.get('/api/rewards')
    .then(response => {
      setRewards(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [rewards.length])

  
  return (
    <>
      <Header>
        <Link to='/rewards/new'><h3>+ Add a Reward</h3></Link>
        <Title>Rewards</Title>
      </Header>
      <ListContainer>
        {
          rewards.map((item)=>{
            return (
              <Reward key={item.id} >
                <h2>Reward for {item.classroom}</h2>
                <p>{item.description}</p>
                <p>AP to Earn Reward: {item.achievement_points}</p>
              </Reward>
            )
          })
        }
      </ListContainer>
    </>
  )
}

export default RewardsIndex