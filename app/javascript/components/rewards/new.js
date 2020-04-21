import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import httpClient from '../../utils/http_client'

import {Header, Title} from '../shared/header'
import {Input, Label, Select} from '../shared/input'
import Submit from '../shared/submit'


const NewReward = (props) => {
  const [classId, setClassId] = useState()
  const [description, setDescription] = useState()
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
      description: description,
      achievementPoints: achievementPoints
    }

    httpClient.post('/api/rewards', body)
    .then(response => {
      props.history.push('/rewards')
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }  

  return (
    <>
      <Header>
        <Title>Add an new Reward</Title>
      </Header>

      <Label>
        <div>Select a Classroom</div>
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
        label="Add a Description: "
        type="textbox"
        id="description"
        placeholder="a brief description of the reward"
        onChange={e => setDescription(e.target.value)}
      />

      <Input
        label="Set the Achievement Point Amount: "
        type="number"
        id="achievement-points"
        placeholder="points a student needs to earn the reward"
        onChange={e => setAchievementPoints(parseInt(e.target.value))}
      />

      <Submit
        label='Save'
        onClick={handleSave}
      />
    </>
  )
}

export default withRouter(NewReward)