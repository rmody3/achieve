import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 0 40px;
  justify-content: space-between;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 10px;
  background-color: #FFC447;
  width: 28%;
  min-height: 150px;
  margin-bottom: 20px;
`

const Title = styled.h2`
  margin: 5px;
`
const Value = styled.p`
  font-size: 48px;
  text-align: center;
  font-weight: 1000;
  margin: 0;
`

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Strong = styled.strong`
  padding: 5px 0px;
`

const  AccountSummary = (props) => {
  return(
    <Container>
      <Box>
        <Title>CURRENT LEVEL</Title>
        <Value>{props.studentInfo.level}</Value>
      </Box>
      <Box>
        <Title>YOUR BADGES</Title>
        <Value>{props.studentInfo.badges}</Value>
        <BadgeList></BadgeList>
      </Box>
      <Box>
        <Title>POINTS EARNED</Title>
        <Value>{props.studentInfo.points_total}</Value>
        <Title>POINTS LEFT TO REDEEM</Title>
        <Value>{props.studentInfo.points_remaining}</Value>
      </Box>
    </Container>
  )
}

export default AccountSummary