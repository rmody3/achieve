import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import httpClient from '@utils/http_client'

import {Header, Title} from '@components/shared/header'
import {Input} from '@components/shared/input'
import Submit from '@components/shared/submit'


const NewClassroom = (props) => {
  const [joinCode, setJoinCode] = useState()

  const handleSave = (e) => {
    e.preventDefault()

    let body = {
      joinCode: joinCode
    }

    httpClient.post('/api/class_participants', body)
    .then(response => {
      props.history.push('/classrooms')
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }  

  return (
    <>
      <Header>
        <Title>Join a Classroom</Title>
      </Header>
      <Input
        label="Join Code:"
        type="text"
        id="join-code"
        placeholder="123abc456"
        onChange={e => setJoinCode(e.target.value)}
      />

      <Submit
        label='Join'
        onClick={handleSave}
      />
    </>
  )
}

export default withRouter(NewClassroom)