import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import {Header, Title, Subtitle, SubHeader} from '@components/shared/header'
import Submit from '@components/shared/submit'


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
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  overflow-wrap: break-word;
  padding: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: white;
`
const ClaimedReward = styled(Reward)`
  background-color: lightgreen;
`

const RewardsIndex = () => {
  const [rewards, setRewards] = useState([]);
  const [claimedRewards, setClaimedRewards] = useState([]);

  const claimReward = (e, rewardId) => {
    e.preventDefault()

    httpClient.post(`/api/rewards/${rewardId}/claim`)
    .then(response => {
      setRewards([])
      setClaimedRewards([])
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }

  useEffect(()=> { 
    httpClient.get('/api/rewards')
    .then(response => {
      setRewards(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [rewards.length])


  useEffect(()=> { 
    httpClient.get('/api/rewards/claimed')
    .then(response => {
      setClaimedRewards(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [claimedRewards.length])

  
  return (
    <>
      <Header>
        <Title>Rewards</Title>
      </Header>
      <SubHeader>
        <Subtitle>Available Rewards</Subtitle>
      </SubHeader>
      <ListContainer>
        {
          rewards.map((item)=>{
            return (
              <Reward key={item.id} >
                <h2>Reward for {item.classroom}</h2>
                <p>{item.description}</p>
                <p>AP to Earn Reward: {item.achievement_points}</p>
                <Submit
                  label="Claim"
                  onClick={(e)=> {claimReward(e, item.id)}}
                />
              </Reward>
            )
          })
        }
      </ListContainer>
      <SubHeader>
        <Subtitle>Claimed Rewards</Subtitle>
      </SubHeader>
      <ListContainer>
      {
        claimedRewards.map((item)=>{
          return (
            <ClaimedReward key={item.id} >
              <h2>Reward for {item.classroom}</h2>
              <p>{item.description}</p>
              <p>AP to Earn Reward: {item.achievement_points}</p>
            </ClaimedReward>
          )
        })
      }
    </ListContainer>
    </>
  )
}

export default RewardsIndex