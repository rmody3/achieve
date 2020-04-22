import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import httpClient from '@utils/http_client'

import {Header, Title} from '@components/shared/header'
import {Input, Label, Select} from '@components/shared/input'
import Submit from '@components/shared/submit'

const NewGoal = (props) => {
  const [classId, setClassId] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [dueDate, setDueDate] = useState()
  const [achievementPoints, setAchievementPoints] = useState()
  const [classrooms, setClassrooms] = useState([])

  useEffect(()=> { 
    httpClient.get('/api/classrooms')
    .then(response => {
      setClassrooms(response.data)
      setClassId(response.data[0].id)
      console.log(response)
    }).catch(response => {
      console.log(response)
    })  
  }, [classrooms.length])

  const handleSave = (e) => {
    e.preventDefault()

    let body = {
      classId: classId,
      title: title,
      description: description,
      achievementPoints: achievementPoints,
      dueDate: dueDate
    }

    httpClient.post('/api/goals', body)
    .then(response => {
      props.history.push('/dashboard')
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }  

  return (
    <>
      <Header>
        <Title>Add an new Goal</Title>
      </Header>

      <Label>
        <div>Select a Class for your Goal:</div>
        <Select onChange={e=> setClassId(parseInt(e.target.value))} value={classId}>
          {
            classrooms.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })
          }
        </Select>
      </Label>


      <Input
        label="Title:"
        type="text"
        id="goal"
        placeholder="a short summary of your goal"
        onChange={e => setTitle(e.target.value)}
      />

      <Input
        label="Description: "
        type="textbox"
        id="description"
        placeholder="a detailed summary of our description"
        onChange={e => setDescription(e.target.value)}
      />

      <Input
        label="Set the Achievement Points you think you should earn: "
        type="number"
        id="achievement-points"
        placeholder="points you should earn, your teacher will review"
        onChange={e => setAchievementPoints(parseInt(e.target.value))}
      />

      <Input
        label="Due Date: "
        type="date"
        id="due-date"
        placeholder="when you want to complete your goal by"
        onChange={e => setDueDate(e.target.value)}
      />

      <Submit
        label='Save'
        onClick={handleSave}
      />
    </>
  )
}

export default withRouter(NewGoal)