import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '../../utils/http_client'

const Container = styled.div`
  width: 100%;
  margin-left: 150px
`
const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 20px
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`

const Title = styled.h1`
  padding: 0 50px;
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
  // const [rewards, setRewards] = useState([]);

  // useEffect(()=> { 
  //   httpClient.get('/api/rewards')
  //   .then(response => {
  //     setRewards(response.data)
  //     console.log(response)
  //   }).catch(response => {
  //     console.log(response)
  //   })  
  // }, [rewards.length])

  const rewards = [
    {
      classroom: 'Math 101',
      achievement_points: 400,
      description: "Receive 10 points back on any test"
    },
    {
      classroom: 'Science 101',
      achievement_points: 200,
      description: "Instead of doing one homework, give class demonstration on something you care about"
    }
  ]
  
  return (
    <Container>
      <Header>
        <Link to='/rewards/new'><h3>+ Add a Reward</h3></Link>
        <Title>Rewards</Title>
      </Header>
      <ListContainer>
        {
          rewards.map((item)=>{
            return <StyledLink key={item.id} to={`rewards/${item.id}`}>
              <Reward>
                <h2>Reward for {item.classroom}</h2>
                <p>{item.description}</p>
                <p>AP to Earn Reward: {item.achievement_points}</p>
              </Reward>
            </StyledLink>
          })
        }
      </ListContainer>
    </Container>
  )
}

export default RewardsIndex