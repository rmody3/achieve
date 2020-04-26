import React from 'react'
import styled from 'styled-components'

const Notice = styled.h2`
  background-color: lightgreen;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50%;
  min-height: 100px;
  margin: 20px;
  align-self: flex-start; 
  border-radius: 8px;
  word-wrap: break-word;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: white;
  padding: 10px 0px;
`

const GoalHeader = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  width: 100%;
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const GoalSubHeader = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`

const GoalSubHeaderColumn = styled.div`
  display:flex;
  flex-direction: column;
`

const GoalDescription = styled.div`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
`

const StyledP = styled.p`
  font-size: 18px;
  margin: 5px;
  font-weight: 600;
`

export const Goal = (props) => {
  return(
    <Container>
      <GoalHeader>
        <h2>{props.title}</h2>
        <ApproveNotice approvedDate={props.approved_date} />
      </GoalHeader>
      <GoalSubHeader>
        { (props.email || props.classroom_name) && 
           <GoalSubHeaderColumn>
            {props.email && <StyledP>Student: {props.email}</StyledP>}
            {props.classroom_name && <StyledP>Class: {props.classroom_name}</StyledP>}
          </GoalSubHeaderColumn>
        }
        <GoalSubHeaderColumn>
          <StyledP>Due Date: {props.due_date}</StyledP>
          <StyledP>Achievement Points: {props.achievement_points}</StyledP>
        </GoalSubHeaderColumn>
      </GoalSubHeader>
      <GoalDescription>
        <StyledP>Description</StyledP>
        <div>{props.description}</div>
      </GoalDescription>
    </Container>
  )
}

export const ApproveNotice = (props) => {
  if (props.approvedDate != null){
    return <Notice>Achieved!</Notice>
  } else {
    return null
  }
}