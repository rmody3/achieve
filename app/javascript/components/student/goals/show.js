import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

import httpClient from '@utils/http_client'

import {Header, Title, SubHeader, Subtitle} from '@components/shared/header'
import {Input} from '@components/shared/input'
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
  height: 200px;
  border: 1px solid black;
  margin: 20px;
  align-self: flex-start;
  border-radius: 8px;
  word-wrap: normal;
`

const CommentsContainer = styled.div`
  max-width: 100%;
  padding: 0px 40px; 
`

const Comment = styled.div`
  max-width: 75%;
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 5px;
  background-color: lightskyblue;
  flex-direction: column;
  border-radius: 5px;

  &.student {
    padding-right: 5px;
    text-align: right;
    margin-left: auto;
  }

  &.teacher {
    padding-left: 5px;
    text-align: left;
  }
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
    margin: 0px;
  }
`

const GoalShow = () => {
  let { id } = useParams()
  const [goal, setGoal] = useState({})
  const [comments, setComments] = useState([])
  const [commentBody, setCommentBody] = useState()
  // setComments(comments => [...comments, query])

  const handleSave = (e) => {
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

  useEffect(()=> { 
    httpClient.get(`/api/goals/${id}`)
    .then(response => {
      setGoal(response.data.goal)
      setComments(response.data.comments)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [goal.size])
  
  return (
    <>
      <Header>
        <Title>Goal: {goal ? goal.title : 'Loading'}</Title>
      </Header>
      <ListContainer>
        <Goal>
          <p>Description: {goal.description}</p>
          <h4>Due Date: {goal.due_date}</h4>
          <h4>Achievement Points: {goal.achievement_points}</h4>
        </Goal>
      </ListContainer>
      <SubHeader>
        <Subtitle>{comments.length > 0 ? 'Updates' : 'Add Your Comments'}</Subtitle>
      </SubHeader>
      <CommentsContainer>
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
      </CommentsContainer>
      <AddCommentContainer>
        <Input
          label="Add an Update: "
          type="textbox"
          id="update"
          placeholder=""
          onChange={e => setCommentBody(e.target.value)}
        />

        <StyledSubmit
          label='Add'
          onClick={handleSave}
        />
      </AddCommentContainer>
    </>
  )
}

export default GoalShow