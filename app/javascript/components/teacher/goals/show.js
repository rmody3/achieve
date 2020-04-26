import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import {Header, Title, SubHeader, Subtitle} from '@components/shared/header'
import {Input, Button} from '@components/shared/input'
import Submit from '@components/shared/submit'

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
  border: 1px solid black;
  margin: 20px 20px 0px 20px;
  align-self: flex-start;
  border-radius: 8px;
  word-wrap: normal;
`

const CommentsContainer = styled.div`
  max-width: 100%;
  margin: 0px 40px; 
  max-height: 200px;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`

// teaacher comments on right side
const Comment = styled.div`
  max-width: 75%;
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 5px;
  background-color: lightskyblue;
  flex-direction: column;
  border-radius: 5px;

  &.teacher {
    padding-right: 5px;
    text-align: right;
    margin-left: auto;
  }

  &.student {
    padding-left: 5px;
    text-align: left;
  }
`

const StyledTitle = styled(Title)`
  background-color: lightgreen;
  border-radius: 5px;
`

const Strong = styled.strong`
  padding: 5px 0px;
`

const AddCommentContainer = styled.div`
  max-width: 100%;
  padding: 40px 40px 10px; 
`

const StyledSubmit = styled(Submit)`
  && {
    margin: 0px 0px 20px;
  }
`

const GoalShow = () => {
  let { id } = useParams()
  const [goal, setGoal] = useState({})
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState()
  const [dueDate, setDueDate] = useState()
  const [achievementPoints, setAchievementPoints] = useState()

  const handleCommentSave = (e) => {
    e.preventDefault()

    let body = {
      goalId: id, 
      commentBody: commentBody
    }

    httpClient.post('/api/comments', body)
    .then(response => {
      setComments(comments => [...comments, response.data])
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  } 

  const updateGoal = (e) => {
    e.preventDefault()

    let body = {
      goalId: id, 
      dueDate: dueDate,
      achievementPoints: achievementPoints
    }

    httpClient.put(`/api/goals/${id}`, body)
    .then(response => {
      setGoal(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  } 

  const approveGoal = (e) => {
    e.preventDefault()

    let body = {
      approvedDate: Date.now()
    }

    httpClient.put(`/api/goals/${id}/approve`, body)
    .then(response => {
      setGoal(response.data)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }  

  useEffect(()=> { 
    httpClient.get(`/api/goals/${id}`)
    .then(response => {
      setGoal(response.data.goal)
      setComments(response.data.comments)
      setDueDate(response.data.goal.due_date)
      setAchievementPoints(response.data.goal.achievement_points)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goal.size])

  const showApproved = () => {
    if(goal && goal.approved_date != null){
      return <StyledTitle>Approved!</StyledTitle>
    } else {
      return (
        <Submit label="Approve" onClick={approveGoal} />
      ) 
    }
  }
  
  return (
    <>
      <Header>
        {showApproved()}
        <Title>Goal: {goal ? goal.title : 'Loading'}</Title>
      </Header>
      <ListContainer>
        <Goal>
          <p>Description: {goal.description}</p>
          <Input
            label="Due Date: "
            type="textbox"
            id="due-date"
            placeholder=""
            defaultValue={dueDate}
            onChange={e => setDueDate(e.target.value)}
            disabled={!!goal.approved_date}
          />
          <Input
            label="Achievement Points: "
            type="textbox"
            id="achievement-points"
            placeholder=""
            defaultValue={achievementPoints}
            onChange={e => setAchievementPoints(e.target.value)}
            disabled={!!goal.approved_date}
          />
          <StyledSubmit
            label='Save Changes'
            onClick={updateGoal}
            disabled={!!goal.approved_date}
          />
        </Goal>
      </ListContainer>
      <SubHeader>
        <Subtitle>{comments.length > 0 ? 'Updates' : 'Add Your Comments'}</Subtitle>
      </SubHeader>
      <CommentsContainer>
        <div>
          {
            comments.map((c,i) => {
              return (
                <Comment key={i} className={c.author_type} >
                  <Strong> {c.email} </Strong>
                  <div>{c.body}</div>
                </Comment>
              ) 
            })
          }
        </div>
      </CommentsContainer>
      <AddCommentContainer>
        <Input
          label="Add Feedback: "
          type="textbox"
          id="update"
          placeholder=""
          onChange={e => setCommentBody(e.target.value)}
        />

        <StyledSubmit
          label='Add'
          onClick={handleCommentSave}
          disabled={!!goal.approved_date}
        />
      </AddCommentContainer>
    </>
  )
}

export default GoalShow